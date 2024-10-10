import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Progress {
	[key: string]: {
		completed_chapters: { chapter: string }[];
		certificate_issued: boolean;
	};
}

async function fetchSyncData(method: string, body?) {
	try {
		const response = await fetch('/api/progress', {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		});

		if (!response.ok) {
			throw new Error('Failed to fetch sync data');
		}

		return await response.json();
	} catch (error) {
		console.error('Failed to fetch sync data', error);
		return null;
	}
}

function createProgressStore() {
	const { subscribe, set, update } = writable<Progress>({});
	const isSyncEnabledCached: boolean | null = null;
	const progressCache: { [key: string]: number } = {};

	async function loadInitialState() {
		const state: Progress = {};
		if (typeof localStorage !== 'undefined') {
			if (await isSyncEnabled()) {
				return state;
			}
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key && key.startsWith('progress_')) {
					const courseId = key.split('_')[1];
					const item = localStorage.getItem(key);
					if (item) {
						state[courseId] = JSON.parse(item);
					}
				}
			}
		}
		return state;
	}

	async function initializeStore() {
		const initialState = browser ? await loadInitialState() : {};
		set(initialState);

		if (browser && typeof localStorage !== 'undefined') {
			const CURRENT_VERSION = 1;
			localStorage.setItem('version', CURRENT_VERSION.toString());
		}
	}

	async function syncProgress(
		course: string,
		newProgress: { completed_chapters: { chapter: string }[]; certificate_issued: boolean }
	) {
		try {
			const response = await fetch('/api/progress', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					course,
					completedChapters: newProgress.completed_chapters,
					certificateIssued: newProgress.certificate_issued
				})
			});

			if (!response.ok) {
				throw new Error('Failed to sync progress');
			}
		} catch (error) {
			console.error('Failed to sync progress', error);
		}
	}

	async function fetchProgress(course: string): Promise<Progress> {
		try {
			const response = await fetch(`/api/progress?course=${course}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch progress');
			}

			const data = await response.json();
			update((currentState) => {
				return { ...currentState, [course]: data };
			});
			return data;
		} catch (error) {
			console.error('Failed to fetch progress', error);
			return {};
		}
	}

	async function initSync() {
		const data = await fetchSyncData('POST');
		if (data) {
			return data.user;
		}
	}

	async function isSyncEnabled() {
		try {
			const data = await fetchSyncData('GET');
			return data.status === 200;
		} catch (error) {
			console.error('Failed to check if syncing is enabled', error);
			return false;
		}
	}

	async function getSyncCode() {
		const data = await fetchSyncData('GET');
		if (data) {
			return data.user;
		}
		return false;
	}

	async function completeChapter(course: string, chapter: string) {
		if (browser) {
			const syncEnabled = await isSyncEnabled();

			update((currentProgress) => {
				// Initialize course progress if not present
				if (!currentProgress[course]) {
					currentProgress[course] = { completed_chapters: [], certificate_issued: false };
				}

				const chapters = currentProgress[course].completed_chapters || [];
				if (!chapters.some((c) => c.chapter === chapter)) {
					chapters.push({ chapter });
				}
				const newProgress = {
					completed_chapters: chapters,
					certificate_issued: currentProgress[course].certificate_issued
				};

				if (syncEnabled) {
					syncProgress(course, newProgress);
				} else {
					localStorage.setItem(`progress_${course}`, JSON.stringify(newProgress));
				}

				// Invalidate the cache
				delete progressCache[course];

				return { ...currentProgress, [course]: newProgress };
			});
		}
	}

	async function getProgress(course: string) {
		if (browser) {
			const syncEnabled = await isSyncEnabled();
			if (syncEnabled) {
				return await fetchProgress(course);
			} else {
				const localProgress = localStorage.getItem(`progress_${course}`);
				return localProgress ? JSON.parse(localProgress) : null;
			}
		}
		return null;
	}

	async function issueCertificate(course: string) {
		if (browser) {
			update((currentProgress) => {
				// Ensure course progress is initialized
				if (!currentProgress[course]) {
					currentProgress[course] = { completed_chapters: [], certificate_issued: false };
				}

				// Set certificate_issued to true
				const newProgress = { ...currentProgress[course], certificate_issued: true };

				if (isSyncEnabledCached) {
					syncProgress(course, newProgress);
				} else {
					localStorage.setItem(`progress_${course}`, JSON.stringify(newProgress));
				}

				return { ...currentProgress, [course]: newProgress };
			});
		}
	}

	async function isCertificateIssued(course: string): Promise<boolean> {
		const progress = await getProgress(course);
		return progress?.certificate_issued || false;
	}

	return {
		subscribe,
		completeChapter,
		initializeStore,
		getProgress,
		getSyncCode,
		isSyncEnabled,
		issueCertificate,
		isCertificateIssued,
		isChapterCompleted: async (course: string, chapter: string) => {
			const progress = await getProgress(course);
			if (progress) {
				const { completed_chapters } = progress;
				return completed_chapters.some((c) => c.chapter === chapter);
			}
			return false;
		},
		getCourseProgress: async (course: string, totalChapters: number) => {
			if (browser) {
				if (course in progressCache) {
					return progressCache[course];
				}
				let progress;
				const syncEnabled = await isSyncEnabled();
				if (syncEnabled) {
					progress = await fetchProgress(course);
				} else {
					const localProgress = localStorage.getItem(`progress_${course}`);
					progress = localProgress ? JSON.parse(localProgress) : null;
				}

				if (progress) {
					const { completed_chapters } = progress;
					if (completed_chapters !== null && completed_chapters !== undefined) {
						const calculatedProgress = Math.round(
							(completed_chapters.length / totalChapters) * 100
						);
						progressCache[course] = calculatedProgress;
						return calculatedProgress;
					}
				}
			}
			progressCache[course] = 0;
			return 0;
		},
		enableSyncing: async () => {
			if (browser) {
				const user = await initSync();
				const progress = await loadInitialState();
				for (const course in progress) {
					await syncProgress(course, progress[course]);
				}
				console.log('Syncing enabled');
				localStorage.clear(); // Optionally clear local storage
				return user;
			}
		}
	};
}

export const progressStore = createProgressStore();

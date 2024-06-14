import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Progress {
	[key: string]: {
		completed_chapters: { chapter: string }[];
	};
}

function createProgressStore() {
	const { subscribe, set, update } = writable<Progress>({});
	let isSyncEnabledCached: boolean | null = null;

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
		console.log('Initial State:', initialState); // Debug: Log initial state
	}

	async function syncProgress(
		course: string,
		newProgress: { completed_chapters: { chapter: string }[] }
	) {
		try {
			const response = await fetch('/api/progress', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ course, completedChapters: newProgress.completed_chapters })
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
			console.log('Fetched Progress:', data); // Debug: Log fetched progress
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
		try {
			await fetch('/api/progress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			console.error('Failed to init sync', error);
		}
	}

	async function isSyncEnabled() {
		if (isSyncEnabledCached !== null) return isSyncEnabledCached;
		try {
			const response = await fetch('/api/progress', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			isSyncEnabledCached = response.status === 200;
			return isSyncEnabledCached;
		} catch (error) {
			console.error('Failed to check if syncing is enabled', error);
			return false;
		}
	}

	async function completeChapter(course: string, chapter: string) {
		if (browser) {
			const syncEnabled = await isSyncEnabled();

			update((currentProgress) => {
				const chapters = currentProgress[course] ? currentProgress[course].completed_chapters : [];
				if (!chapters.some((c) => c.chapter === chapter)) {
					chapters.push({ chapter });
				}
				const newProgress = { completed_chapters: chapters };

				if (syncEnabled) {
					syncProgress(course, newProgress);
				} else {
					localStorage.setItem(`progress_${course}`, JSON.stringify(newProgress));
				}

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

	return {
		subscribe,
		completeChapter,
		initializeStore,
		getProgress,
		isChapterCompleted: async (course: string, chapter: string) => {
			const progress = await this.getProgress(course);
			if (progress) {
				const { completed_chapters } = progress;
				return completed_chapters.some((c) => c.chapter === chapter);
			}
			return false;
		},
		getCourseProgress: async (course: string, totalChapters: number) => {
			if (browser) {
				let progress;
				const syncEnabled = await isSyncEnabled();
				if (syncEnabled) {
					progress = await fetchProgress(course);
				} else {
					const localProgress = localStorage.getItem(`progress_${course}`);
					progress = localProgress ? JSON.parse(localProgress) : null;
				}

				console.log('Course Progress:', progress); // Debug: Log course progress

				if (progress) {
					const { completed_chapters } = progress;
					console.log('Completed Chapters:', completed_chapters); // Debug: Log completed chapters
					return (completed_chapters.length / totalChapters) * 100;
				}
			}
			return 0;
		},
		enableSyncing: async () => {
			if (browser) {
				await initSync();
				const progress = loadInitialState();
				for (const course in progress) {
					await syncProgress(course, progress[course]);
				}
				console.log('Syncing enabled');
				localStorage.clear(); // Optionally clear local storage
			}
		}
	};
}

export const progressStore = createProgressStore();

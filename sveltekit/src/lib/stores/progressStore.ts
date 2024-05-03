import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Progress {
    [key: string]: {
        completedChapters: string[];
    };
}

function createProgressStore() {
    const initialState = browser ? loadInitialState() : {};
    const { subscribe, set, update } = writable<Progress>(initialState);

    function loadInitialState(): Progress {
        let state: Progress = {};
        if (typeof localStorage !== 'undefined') {
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

    return {
        subscribe,
        completeChapter: (courseId: string, chapterId: string) => {
            if (browser) {
                update(currentProgress => {
                    const chapters = currentProgress[courseId] ? currentProgress[courseId].completedChapters : [];
                    if (!chapters.includes(chapterId)) {
                        chapters.push(chapterId);
                    }
                    const newProgress = { completedChapters: chapters };
                    localStorage.setItem(`progress_${courseId}`, JSON.stringify(newProgress));
                    return { ...currentProgress, [courseId]: newProgress };
                });
            }
        },
        getProgress: (courseId: string) => {
            if (browser) {
                const progress = localStorage.getItem(`progress_${courseId}`);
                return progress ? JSON.parse(progress) : null;
            }
            return null;
        },
        isChapterCompleted: (courseId: string, chapterId: string) => {
            if (browser) {
                const progress = localStorage.getItem(`progress_${courseId}`);
                if (progress) {
                    const { completedChapters } = JSON.parse(progress);
                    return completedChapters.includes(chapterId);
                }
            }
            return false;
        },
        getCourseProgress: (courseId: string, totalChapters: number) => {
            if (browser) {
                const progress = localStorage.getItem(`progress_${courseId}`);
                if (progress) {
                    const { completedChapters } = JSON.parse(progress);
                    return (completedChapters.length / totalChapters) * 100;
                }
            }
            return 0;
        }
    };
}

export const progressStore = createProgressStore();

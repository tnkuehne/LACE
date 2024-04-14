import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createProgressStore() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        setProgress: (courseId: string, chapterTitle: string) => {
            if (browser) {
                const newProgress = { lastVisitedChapter: chapterTitle };
                localStorage.setItem(`progress_${courseId}`, JSON.stringify(newProgress));
                update(currentProgress => {
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
        }
    };
}

export const progressStore = createProgressStore();

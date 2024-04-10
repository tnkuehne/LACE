import {writable} from 'svelte/store';
import {browser} from '$app/environment';

function createProgressStore() {
    const {subscribe, set} = writable<string | null>(null);

    return {
        subscribe,
        setProgress: (chapterTitle: string) => {
            if (browser) {
                localStorage.setItem('progress', chapterTitle);
                set(chapterTitle);
            }
        },
        initialize: () => {
            if (browser) {
                const chapter = localStorage.getItem('progress');
                if (chapter) {
                    set(chapter);
                }
            }
        }
    };
}

export const progressStore = createProgressStore();
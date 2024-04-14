import type { PageLoad } from './$types';
import getDirectusInstance from "$lib/directus";
import {readItems} from "@directus/sdk";
import {error} from "@sveltejs/kit";
import type {Question} from "$lib/types";

export const load: PageLoad = async ({ fetch, params }) => {
    const {courseTitle, chapterTitle} = params;
    const directus = getDirectusInstance(fetch);

    try {
        // Use the readItems method from the Directus SDK
        const response = await directus.request(
            readItems('kapitel', {
                filter: {title: chapterTitle},
                fields: ['*', 'content.collection', 'content.item.bild', 'content.item.answers.text', 'content.item.answers.correct', 'content.item.question', 'kurs.*'], // Specify the fields you want to retrieve
            })
        );

        // Process content to maintain order and transform quizzes
        const content = response[0].content.map((item: any) => {
            if (item.collection === 'mcQuiz' && item.item && item.item.answers) {
                // Transform quiz items into Question format
                const question: Question = {
                    question: item.item.question,
                    answers: item.item.answers.map((answer: any) => ({
                        text: answer.text,
                        correct: answer.correct
                    })),
                    correct: item.item.answers
                        .map((answer: any, index: number) => answer.correct ? index : -1)
                        .filter((index: number) => index !== -1)
                };
                return { ...item, item: question };
            } else {
                // Return other types of content unchanged
                return item;
            }
        });

        return {
            chapter: {...response[0], content},
        };
    } catch (err) {
        console.error('Error fetching chapters:', err);
        throw error(500, 'Internal Server Error');
    }

};

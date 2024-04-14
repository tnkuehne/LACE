import type {PageLoad} from './$types';
import getDirectusInstance from "$lib/directus";
import {readItems} from "@directus/sdk";
import {error} from "@sveltejs/kit";
import type {Question} from "$lib/types";

export const load: PageLoad = async ({fetch, params}) => {
    const {courseTitle, chapterTitle} = params;
    const directus = getDirectusInstance(fetch);

    try {
        // Use the readItems method from the Directus SDK
        const response = await directus.request(
            readItems('Slides', {
                filter: {Chapter: {Title: chapterTitle}},
                fields: ['*', 'Chapter.*.*'], // Specify the fields you want to retrieve
            })
        );

        const quizResponse = await directus.request(
            readItems('Quizes', {
                filter: {Chapter: {Title: chapterTitle}},
                fields: ['*', 'Chapter.*', 'Alternatives.*.*'], // Specify the fields you want to retrieve
            })
        );

        const transformedQuizzes: Question[] = quizResponse.map((quiz: any) => ({
            question: quiz.Question,
            answers: quiz.Alternatives.map((alt: any) => ({text: alt.Text})),
            correct: quiz.Alternatives.reduce((acc: number[], alt: any, index: number) => {
                if (alt.Correct) acc.push(index);
                return acc;
            }, [])
        }));

        if (response && response.length > 0) {
            return {
                slides: response,
                quizzes: transformedQuizzes
            };
        } else {
            return {
                slides: [],
                quiz: []
            }
        }
    } catch (err) {
        console.error('Error fetching chapters:', err);
        throw error(500, 'Internal Server Error');
    }

};

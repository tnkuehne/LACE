export interface Answer {
	text: string;
}

export interface Question {
	question: string;
	answers: Answer[];
	correct: number[]; // Array of indices of the correct answers
}

export interface Slide {
	image: string;
	Chapter: { id: string; Title: string; Course: { id: string } };
}

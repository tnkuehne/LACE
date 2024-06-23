import { z } from 'zod';

export const formSchema = z.object({
	questionResponses: z.array(
		z.object({
			question: z.string(),
			answer: z.union([
				z.string(),
				z.enum(['option-one', 'option-two', 'option-three', 'option-four', 'option-five'])
			])
		})
	)
});

export type FormSchema = typeof formSchema;

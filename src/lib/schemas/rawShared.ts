import { z } from 'zod';

export const NullableString = z.string().nullable().optional();

export const ReferencedSchema = z.object({
	id: z.number(),
	value: NullableString,
	order: z.string()
});

export type Referenced = z.infer<typeof ReferencedSchema>;

export const SingleSelectSchema = z.object({
	id: z.number(),
	value: NullableString,
	color: NullableString
});
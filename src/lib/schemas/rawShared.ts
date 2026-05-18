import { z } from 'zod';

export const NullableString = z.string().nullable().optional();

export const ReferencedSchema = z.object({
	id: z.number(),
	value: NullableString,
	order: z.string()
});
// src/lib/schemas/authors.ts

import { z } from 'zod';
import { NullableString } from './rawShared';

export const AuthorSchema = z.object({
	id: z.number(),
	order: z.string,
	name: z.string(),
	gnd: NullableString,
	wikidata: NullableString,
	loi_id: NullableString
});

export const AuthorsSchema = z.array(AuthorSchema);

export type Author = z.infer<typeof AuthorSchema>;
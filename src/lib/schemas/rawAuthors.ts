import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawAuthorSchema = z.object({
	id: z.number(),
	order: z.string(),
	name: z.string(),
	gnd: NullableString,
	wikidata: NullableString,
	loi_id: NullableString,
	birth_date: z.array(ReferencedSchema),
	death_date: z.array(ReferencedSchema),
});

export const RawAuthorsSchema = z.record(z.string(), RawAuthorSchema);

export type RawAuthor = z.infer<typeof RawAuthorSchema>;
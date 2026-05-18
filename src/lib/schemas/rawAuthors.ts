import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawAuthorSchema = z.object({
	id: z.number(),
	order: z.string(),
	name: z.string(),
	gnd: NullableString,
	wikidata: NullableString,
	loi_id: NullableString
});

export const RawAuthorsSchema = z.record(z.string(), RawAuthorSchema);

export type RawAuthor = z.infer<typeof RawAuthorSchema>;
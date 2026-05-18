import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawCorpusSchema = z.object ({
    id: z.number(),
    order: z.string(),
    name: NullableString,
    note: NullableString,
    reference: NullableString,
    url: NullableString,
    loi_id: NullableString
})

export const RawCorporaSchema = z.record(z.string(), RawCorpusSchema);

export type RawCorpus = z.infer<typeof RawCorpusSchema>;

import { z } from 'zod';
import { NullableString } from './rawShared';

export const CorpusSchema = z.object ({
    id: z.number,
    order: z.string,
    name: NullableString,
    note: NullableString,
    reference: NullableString,
    url: NullableString,
    loi_id: NullableString
})

export const CorporaSchema = z.array(CorpusSchema);

export type Corpus = z.infer<typeof CorpusSchema>;

import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const KeywordSchema = z.object ({
    id: z.number,
    order: z.string,
    label: NullableString,
    notes: NullableString,
    loi_id: NullableString,
    passages: z.array(ReferencedSchema)
})


export const KeywordsSchema = z.array(KeywordSchema);

export type Keyword = z.infer<typeof KeywordSchema>;

import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawKeywordSchema = z.object ({
    id: z.number(),
    order: z.string(),
    label: NullableString,
    notes: NullableString,
    loi_id: NullableString,
    passages: z.array(ReferencedSchema)
})


export const RawKeywordsSchema = z.record(z.string(), RawKeywordSchema);

export type RawKeyword = z.infer<typeof RawKeywordSchema>;

import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawPassageSchema = z.object ({
    id: z.number(),
    order: z.string(),
    title: NullableString,
    text: NullableString,
    loi_id: NullableString,
    translation: NullableString,
    parallel_text: z.array(ReferencedSchema),
    bibl_quotes: z.array(ReferencedSchema),
    commentary: NullableString,
    work: z.array(ReferencedSchema),
    german_translation: NullableString,
    page: NullableString,
    keywords: z.array(ReferencedSchema),    
})


export const RawPassagesSchema = z.record(z.string(), RawPassageSchema);

export type RawPassage = z.infer<typeof RawPassageSchema>;

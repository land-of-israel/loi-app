import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const WorkSchema = z.object ({
    id: z.number,
    order: z.string,
    title: NullableString,
    reference: NullableString,
    author: z.array(ReferencedSchema),
    manuscript: z.array(ReferencedSchema),
    date: z.array(ReferencedSchema),
    place: z.array(ReferencedSchema),
    loi_id: NullableString,
    corpus: z.array(ReferencedSchema),
    language: z.array(ReferencedSchema),
})


export const WorksSchema = z.array(WorkSchema);

export type Work = z.infer<typeof WorkSchema>;

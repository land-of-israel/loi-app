import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawParallelSchema = z.object ({
    id: z.number(),
    order: z.string(),
    label: NullableString,
    excerpt: NullableString,
    loi_id: NullableString
})

export const RawParallelsSchema = z.record(z.string(), RawParallelSchema);

export type RawParallel = z.infer<typeof RawParallelSchema>;

import { z } from 'zod';
import { NullableString } from './rawShared';

export const ParallelSchema = z.object ({
    id: z.number,
    order: z.string,
    label: NullableString,
    excerpt: NullableString,
    active: z.boolean,
    loi_id: NullableString
})

export const ParallelsSchema = z.array(ParallelSchema);

export type Parallel = z.infer<typeof ParallelSchema>;

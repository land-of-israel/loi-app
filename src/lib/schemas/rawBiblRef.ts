import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawBiblRefSchema = z.object ({
    id: z.number(),
    order: z.string(),
    bible: NullableString,
    text: NullableString,
    url: NullableString,
    loi_id: NullableString
})

export const RawBiblRefsSchema = z.record(z.string(), RawBiblRefSchema);

export type RawBiblRef = z.infer<typeof RawBiblRefSchema>;

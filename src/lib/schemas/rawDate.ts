import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawDateSchema = z.object ({
    id: z.number(),
    order: z.string(),
    label: NullableString,
    tpq: NullableString,
    taq: NullableString,
    loi_id: NullableString
})

export const RawDatesSchema = z.record(z.string(), RawDateSchema);

export type RawDate = z.infer<typeof RawDateSchema>;

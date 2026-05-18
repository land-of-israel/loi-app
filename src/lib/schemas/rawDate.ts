import { z } from 'zod';
import { NullableString } from './rawShared';

export const DateSchema = z.object ({
    id: z.number,
    order: z.string,
    label: NullableString,
    tpq: NullableString,
    taq: NullableString,
    loi_id: NullableString
})

export const DatesSchema = z.array(DateSchema);

export type Date = z.infer<typeof DateSchema>;

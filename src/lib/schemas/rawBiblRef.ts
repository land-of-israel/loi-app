import { z } from 'zod';
import { NullableString } from './rawShared';

export const BiblRefSchema = z.object ({
    id: z.number,
    order: z.string,
    bible: NullableString,
    text: NullableString,
    url: NullableString,
    loi_id: NullableString
})

export const BiblRefsSchema = z.array(BiblRefSchema);

export type BiblRef = z.infer<typeof BiblRefSchema>;

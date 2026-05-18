import { z } from 'zod';
import { NullableString } from './rawShared';

export const KeywordSchema = z.object ({
    id: z.number,
    order: z.string,
    name: NullableString,
    note: NullableString,
    reference: NullableString,
    loi_id: NullableString,
    main_genre: z.array(
        z.object({
        id: z.number,
        value: NullableString,
        order: z.string
    }))
})

export const KeywordsSchema = z.array(KeywordSchema);

export type Keyword = z.infer<typeof KeywordSchema>;

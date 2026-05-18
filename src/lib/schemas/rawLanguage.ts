import { z } from 'zod';
import { NullableString } from './rawShared';

export const LanguageSchema = z.object ({
    id: z.number,
    order: z.string,
    language: NullableString,
    notes: NullableString,
    loi_id: NullableString
})

export const LanguagesSchema = z.array(LanguageSchema);

export type Language = z.infer<typeof LanguageSchema>;

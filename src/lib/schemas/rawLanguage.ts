import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawLanguageSchema = z.object ({
    id: z.number(),
    order: z.string(),
    language: NullableString,
    notes: NullableString,
    loi_id: NullableString
})

export const RawLanguagesSchema = z.record(z.string(), RawLanguageSchema);

export type RawLanguage = z.infer<typeof RawLanguageSchema>;

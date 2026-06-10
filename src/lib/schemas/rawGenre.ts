import { z } from 'zod';
import { NullableString, SingleSelectSchema } from './rawShared';

export const RawGenreSchema = z.object ({
    id: z.number(),
    order: z.string(),
    name: NullableString,
    note: NullableString,
    reference: NullableString,
    loi_id: NullableString,
    main_genre: SingleSelectSchema.nullable().optional(),
})

export const RawGenresSchema = z.record(z.string(), RawGenreSchema);

export type RawGenre = z.infer<typeof RawGenreSchema>;

import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawGenreSchema = z.object ({
    id: z.number(),
    order: z.string(),
    name: NullableString,
    note: NullableString,
    reference: NullableString,
    loi_id: NullableString,
    main_genre: z.array(ReferencedSchema)
})

export const RawGenresSchema = z.record(z.string(), RawGenreSchema);

export type RawGenre = z.infer<typeof RawGenreSchema>;

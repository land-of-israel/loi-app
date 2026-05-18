import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const GenreSchema = z.object ({
    id: z.number,
    order: z.string,
    name: NullableString,
    note: NullableString,
    reference: NullableString,
    loi_id: NullableString,
    main_genre: z.array(ReferencedSchema)
})

export const GenresSchema = z.array(GenreSchema);

export type Genre = z.infer<typeof GenreSchema>;

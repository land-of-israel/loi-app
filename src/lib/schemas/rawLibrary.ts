import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const LibrarySchema = z.object ({
    id: z.number,
    order: z.string,
    label: NullableString,
    place: z.array(ReferencedSchema),
    full_label: NullableString,
    loi_id: NullableString,
})


export const LibrariesSchema = z.array(LibrarySchema);

export type Library = z.infer<typeof LibrarySchema>;

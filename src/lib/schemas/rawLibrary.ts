import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawLibrarySchema = z.object ({
    id: z.number(),
    order: z.string(),
    label: NullableString,
    place: z.array(ReferencedSchema),
    full_label: NullableString,
    loi_id: NullableString,
})


export const RawLibrariesSchema = z.record(z.string(), RawLibrarySchema);

export type RawLibrary = z.infer<typeof RawLibrarySchema>;

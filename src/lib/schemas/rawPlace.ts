import { z } from 'zod';
import { NullableString } from './rawShared';

export const RawPlaceSchema = z.object ({
    id: z.number(),
    order: z.string(),
    name: NullableString,
    geonames: NullableString,
    loi_id: NullableString,
    wikidata: NullableString,
    note: NullableString
})

export const RawPlacesSchema = z.record(z.string(), RawPlaceSchema);

export type RawPlace = z.infer<typeof RawPlaceSchema>;

import { z } from 'zod';
import { NullableString } from './rawShared';

export const PlaceSchema = z.object ({
    id: z.number,
    order: z.string,
    name: NullableString,
    geonames: NullableString,
    loi_id: NullableString,
    wikidata: NullableString,
    note: NullableString
})

export const PlacesSchema = z.array(PlaceSchema);

export type Place = z.infer<typeof PlaceSchema>;

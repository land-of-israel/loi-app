import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawManuscriptSchema = z.object ({
    id: z.number(),
    order: z.string(),
    shelfmark: z.array( 
        z.object({
            id: z.number(),
            value: NullableString
        })
    ),
    library: z.array(ReferencedSchema),
    idno: NullableString,
    loi_id: NullableString,
})


export const RawManuscriptsSchema = z.record(z.string(), RawManuscriptSchema);

export type RawManuscript = z.infer<typeof RawManuscriptSchema>;

import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const ManuscriptSchema = z.object ({
    id: z.number,
    order: z.string,
    shelfmark: z.array(
        z.object({
            id: z.number,
            value: NullableString
        })
    ),
    library: z.array(ReferencedSchema),
    idno: NullableString,
    loi_id: NullableString,
})


export const ManuscriptsSchema = z.array(ManuscriptSchema);

export type Manuscript = z.infer<typeof ManuscriptSchema>;

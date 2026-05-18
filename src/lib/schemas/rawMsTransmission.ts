import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const MsTransmissionSchema = z.object ({
    id: z.number,
    order: z.string,
    name: NullableString,
    passage: z.array(ReferencedSchema),
    manuscript: z.array(ReferencedSchema),
    locus: NullableString,
    loi_id: NullableString,
})


export const MsTransmissionsSchema = z.array(MsTransmissionSchema);

export type MsTransmission = z.infer<typeof MsTransmissionSchema>;

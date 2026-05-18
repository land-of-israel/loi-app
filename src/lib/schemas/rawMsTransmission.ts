import { z } from 'zod';
import { NullableString, ReferencedSchema } from './rawShared';

export const RawMsTransmissionSchema = z.object ({
    id: z.number(),
    order: z.string(),
    name: NullableString,
    passage: z.array(ReferencedSchema),
    manuscript: z.array(ReferencedSchema),
    locus: NullableString,
    loi_id: NullableString,
})


export const RawMsTransmissionsSchema = z.record(z.string(), RawMsTransmissionSchema);

export type RawMsTransmission = z.infer<typeof RawMsTransmissionSchema>;

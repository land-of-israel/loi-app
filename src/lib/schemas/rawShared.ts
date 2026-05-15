import { z } from 'zod';

export const NullableString = z.string().nullable().optional();
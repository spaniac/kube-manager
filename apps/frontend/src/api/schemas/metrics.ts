import { z } from 'zod';

/**
 * Metrics schema for API responses.
 * Matches backend metrics structure.
 */
export const MetricsSchema = z.object({
    timestamp: z.coerce.date(),
    cpu: z.coerce.number().optional(),
    memory: z.coerce.number().optional(),
    networkIn: z.coerce.number().optional(),
    networkOut: z.coerce.number().optional(),
    storage: z.coerce.number().optional(),
});

export type Metrics = z.infer<typeof MetricsSchema>;

/**
 * Metrics data item schema.
 */
export const MetricsDataSchema = z.object({
    value: z.number(),
});

export type MetricsData = z.infer<typeof MetricsDataSchema>;

import { z } from 'zod';

/**
 * Secret schema for API responses.
 * Matches backend SecretDTO structure.
 */
export const secretSchema = z.object({
    name: z.string(),
    type: z.enum(['Opaque', 'kubernetes.io/service-account-token', 'kubernetes.io/dockercfgjson', 'kubernetes.io/tls']),
    data: z.record(z.string()),
    metadata: z.object({
        name: z.string().optional(),
        creationTimestamp: z.coerce.date().optional(),
        immutable: z.boolean().optional(),
        resourceVersion: z.string().optional(),
    }),
}).strict();

export type Secret = z.infer<typeof secretSchema>;

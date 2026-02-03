import { useState } from 'react';

import { useApiQuery } from '@/hooks/useApiQuery';
import { secretSchema, type Secret } from '@/api/schemas/secret';

/**
 * Component for viewing and decoding Secret values.
 * Provides masking and controlled unmasking for sensitive data.
 */
export function SecretDecoder({ secretId, namespace }: SecretDecoderProps) {
    const [showSecret, setShowSecret] = useState(false);

    const { data: secret, isLoading, error } = useApiQuery({
        queryKey: ['secret', secretId],
        queryFn: () => fetchSecret(secretId),
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!secretId,
    });

    const handleUnmask = () => {
        if (confirm('Are you sure you want to reveal this secret value?')) {
            setShowSecret(true);
        }
    };

    if (isLoading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">{error.message}</div>;

    return (
        <div className="secret-decoder">
            <h3>Secret: {secret?.name}</div>
            <div className="secret-type">Type: {secret?.type}</div>
            <div className="secret-namespace">Namespace: {namespace}</div>

            {!showSecret ? (
                <div className="masked-value">
                    <span className="masked-content">
                        {'*'.repeat(Math.min(Object.keys(secret?.data || {}).length * 32, 32))}
                    </span>
                    <button
                        className="unmask-button"
                        onClick={handleUnmask}
                        aria-label="Unmask secret value"
                    >
                        Unmask
                    </button>
                </div>
            ) : (
                <div className="unmasked-value">
                    <pre className="secret-content">
                        {formatSecretData(secret?.data)}
                    </pre>
                    <button
                        className="remask-button"
                        onClick={() => setShowSecret(false)}
                        aria-label="Mask secret value"
                    >
                        Mask
                    </button>
                </div>
            )}

            <div className="secret-details">
                <div className="detail-row">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">{new Date(secret?.metadata?.creationTimestamp).toLocaleString()}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{secret?.type}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Immutable:</span>
                    <span className="detail-value">{secret?.immutable ? 'Yes' : 'No'}</span>
                </div>
            </div>
        </div>
    );
}

interface SecretDecoderProps {
    secretId?: string;
    namespace: string;
}

function formatSecretData(data: Record<string, string>): string {
    return Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}

async function fetchSecret(secretId: string): Promise<Secret> {
    // TODO: Replace with actual API call
    const mockData: Secret = {
        name: 'my-secret',
        type: 'Opaque',
        data: {
            'API_KEY': 'secret-value-here',
            'DATABASE_URL': 'postgres://localhost:5432/db',
        },
        metadata: {
            name: 'my-secret',
            creationTimestamp: new Date('2025-01-01').toISOString(),
            immutable: false,
        },
    };

    return new Promise((resolve) => setTimeout(() => resolve(mockData), 100));
}

import { Button } from '@components/Button';
import { Input } from '@components/Input';

export type PermissionRuleEffect = 'ALLOW' | 'DENY';

export interface NamespacePermissionRule {
  id: string;
  permissionType: string;
  resourceType: string;
  namespace?: string;
  effect: PermissionRuleEffect;
  resourceNamePattern?: string;
}

interface NamespacePermissionMatrixProps {
  rules: NamespacePermissionRule[];
  disabled?: boolean;
  onChange: (rules: NamespacePermissionRule[]) => void;
}

function createEmptyRule(): NamespacePermissionRule {
  return {
    id: crypto.randomUUID(),
    permissionType: 'READ',
    resourceType: 'POD',
    namespace: '',
    effect: 'ALLOW',
    resourceNamePattern: '',
  };
}

export function NamespacePermissionMatrix({ rules, disabled = false, onChange }: NamespacePermissionMatrixProps) {
  const updateRule = (id: string, next: Partial<NamespacePermissionRule>) => {
    onChange(rules.map((rule) => (rule.id === id ? { ...rule, ...next } : rule)));
  };

  const addRule = () => {
    onChange([...rules, createEmptyRule()]);
  };

  const removeRule = (id: string) => {
    onChange(rules.filter((rule) => rule.id !== id));
  };

  return (
    <section className="namespace-rule-builder">
      <div className="namespace-rule-header">
        <div>
          <h2>Namespace Permission Rules</h2>
          <p>Define explicit ALLOW and DENY policies; DENY always takes precedence.</p>
        </div>
        <Button variant="ghost" disabled={disabled} onClick={addRule}>Add Rule</Button>
      </div>

      {rules.length === 0 && <div className="empty-state">No rules configured. Add a rule to start.</div>}

      {rules.map((rule) => (
        <div key={rule.id} className={`rule-card rule-${rule.effect.toLowerCase()}`}>
          <div className="rule-grid">
            <label>
              Effect
              <select
                value={rule.effect}
                disabled={disabled}
                onChange={(event) => updateRule(rule.id, { effect: event.target.value as PermissionRuleEffect })}
              >
                <option value="ALLOW">ALLOW</option>
                <option value="DENY">DENY</option>
              </select>
            </label>

            <Input
              label="Permission"
              value={rule.permissionType}
              disabled={disabled}
              placeholder="READ"
              onChange={(event) => updateRule(rule.id, { permissionType: event.target.value.toUpperCase() })}
            />

            <Input
              label="Resource"
              value={rule.resourceType}
              disabled={disabled}
              placeholder="POD"
              onChange={(event) => updateRule(rule.id, { resourceType: event.target.value.toUpperCase() })}
            />

            <Input
              label="Namespace"
              value={rule.namespace ?? ''}
              disabled={disabled}
              placeholder="production (leave blank for global)"
              onChange={(event) => updateRule(rule.id, { namespace: event.target.value })}
            />

            <Input
              label="Resource Name Pattern"
              value={rule.resourceNamePattern ?? ''}
              disabled={disabled}
              placeholder="payments-*"
              onChange={(event) => updateRule(rule.id, { resourceNamePattern: event.target.value })}
            />
          </div>

          <div className="rule-actions">
            <Button variant="danger" disabled={disabled} onClick={() => removeRule(rule.id)}>Remove</Button>
          </div>
        </div>
      ))}

      <style>{`
        .namespace-rule-builder {
          border: 1px solid #dbeafe;
          border-radius: 12px;
          background: linear-gradient(170deg, #f8fafc 0%, #eff6ff 100%);
          padding: 16px;
          display: grid;
          gap: 12px;
        }

        .namespace-rule-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .namespace-rule-header h2 {
          margin: 0;
          color: #0f172a;
        }

        .namespace-rule-header p {
          margin: 4px 0 0;
          color: #475569;
          font-size: 13px;
        }

        .empty-state {
          border: 1px dashed #94a3b8;
          border-radius: 8px;
          padding: 10px;
          color: #334155;
          font-size: 13px;
        }

        .rule-card {
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          padding: 12px;
          display: grid;
          gap: 10px;
        }

        .rule-allow {
          border-left: 4px solid #16a34a;
        }

        .rule-deny {
          border-left: 4px solid #dc2626;
        }

        .rule-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
        }

        .rule-grid label {
          display: grid;
          gap: 6px;
          font-size: 13px;
          color: #334155;
        }

        .rule-grid select {
          height: 38px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 0 10px;
          background: #ffffff;
          color: #0f172a;
        }

        .rule-actions {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 980px) {
          .rule-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .namespace-rule-header {
            flex-direction: column;
          }

          .rule-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

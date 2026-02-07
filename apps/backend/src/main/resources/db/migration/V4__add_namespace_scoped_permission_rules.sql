CREATE TABLE permission_rules (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    namespace VARCHAR(255),
    effect VARCHAR(20) NOT NULL,
    resource_name_pattern VARCHAR(255)
);

CREATE INDEX idx_permission_rules_role_id ON permission_rules(role_id);
CREATE INDEX idx_permission_rules_permission_id ON permission_rules(permission_id);
CREATE INDEX idx_permission_rules_namespace ON permission_rules(namespace);

ALTER TABLE permission_rules
    ADD CONSTRAINT chk_permission_rules_effect
    CHECK (effect IN ('ALLOW', 'DENY'));

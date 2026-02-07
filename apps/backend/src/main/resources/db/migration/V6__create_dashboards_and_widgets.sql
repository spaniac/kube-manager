CREATE TABLE dashboards (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id BIGINT NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_owner
        FOREIGN KEY(owner_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE INDEX idx_dashboard_owner_id ON dashboards (owner_id);
CREATE INDEX idx_dashboard_is_public ON dashboards (is_public);
CREATE INDEX idx_dashboard_created_at ON dashboards (created_at);

CREATE TABLE dashboard_widgets (
    id BIGSERIAL PRIMARY KEY,
    dashboard_id BIGINT NOT NULL,
    type VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    config JSONB,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    w INTEGER NOT NULL,
    h INTEGER NOT NULL,
    order_index INTEGER,
    CONSTRAINT fk_dashboard
        FOREIGN KEY(dashboard_id)
            REFERENCES dashboards(id)
            ON DELETE CASCADE
);

CREATE INDEX idx_dashboard_widget_dashboard_id ON dashboard_widgets (dashboard_id);

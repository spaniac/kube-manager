ALTER TABLE roles
    ADD COLUMN role_key VARCHAR(100),
    ADD COLUMN is_custom BOOLEAN,
    ADD COLUMN display_name VARCHAR(100);

UPDATE roles
SET role_key = CASE
        WHEN name IS NOT NULL THEN name
        ELSE CONCAT('ROLE_', id::text)
    END,
    is_custom = FALSE,
    display_name = CASE
        WHEN name = 'ADMIN' THEN 'Admin'
        WHEN name = 'DEVELOPER' THEN 'Developer'
        WHEN name = 'VIEWER' THEN 'Viewer'
        WHEN name IS NOT NULL THEN initcap(lower(name))
        ELSE CONCAT('Role ', id::text)
    END
WHERE role_key IS NULL;

ALTER TABLE roles
    ALTER COLUMN role_key SET NOT NULL,
    ALTER COLUMN is_custom SET NOT NULL,
    ALTER COLUMN is_custom SET DEFAULT FALSE,
    ALTER COLUMN display_name SET NOT NULL,
    ALTER COLUMN name DROP NOT NULL;

CREATE UNIQUE INDEX uk_roles_role_key_ci ON roles (LOWER(role_key));
CREATE UNIQUE INDEX uk_roles_display_name_ci ON roles (LOWER(display_name));

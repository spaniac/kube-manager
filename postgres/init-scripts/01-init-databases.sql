-- Create databases if they don't exist
SELECT 'CREATE DATABASE k8smanager'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'k8smanager')\gexec

SELECT 'CREATE DATABASE keycloak'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloak')\gexec

-- List all databases
\l

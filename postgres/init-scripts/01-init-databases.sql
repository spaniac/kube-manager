-- Create databases if they don't exist
SELECT 'CREATE DATABASE IF NOT EXISTS k8smanager' AS sql
\gexec

SELECT 'CREATE DATABASE IF NOT EXISTS keycloak' AS sql
\gexec

-- List all databases
\l

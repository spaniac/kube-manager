-- V5__add_rbac_audit_columns.sql

-- Add new columns to the audit_logs table for RBAC specific auditing
ALTER TABLE audit_logs
ADD COLUMN category VARCHAR(255),
ADD COLUMN target_type VARCHAR(255),
ADD COLUMN target_id VARCHAR(255),
ADD COLUMN before_data TEXT,
ADD COLUMN after_data TEXT;

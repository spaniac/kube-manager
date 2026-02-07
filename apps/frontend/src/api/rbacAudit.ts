import { ApiResponse } from '../types/api'; // Assuming ApiResponse is defined here or similar
import axios from 'axios';

export interface RbacAuditEvent {
  actor: string;
  action: string;
  timestamp: string; // ISO string
  targetType: string;
  targetId: string;
  beforeData: string; // JSON string
  afterData: string;  // JSON string
}

export interface RbacAuditFilter {
  actor?: string;
  action?: string;
  from?: string; // ISO string
  to?: string;   // ISO string
}

export const getRbacAuditEvents = async (
  filters: RbacAuditFilter
): Promise<ApiResponse<RbacAuditEvent[]>> => {
  try {
    const response = await axios.get<ApiResponse<RbacAuditEvent[]>>(
      '/api/v1/admin/rbac/audit',
      { params: filters }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch RBAC audit events',
      data: [],
    };
  }
};

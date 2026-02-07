import { z } from 'zod';
import apiClient from './client';
import { parseApiResponse } from '@utils/apiResponse';

const rolePermissionSchema = z.object({
  permissionType: z.string(),
  resourceType: z.string(),
  namespace: z.string().nullable().optional(),
});

const roleDetailSchema = z.object({
  id: z.number(),
  roleType: z.string().nullable().optional(),
  roleKey: z.string(),
  displayName: z.string(),
  custom: z.boolean(),
  description: z.string().nullable().optional(),
  permissions: z.array(rolePermissionSchema),
});

const roleAssignmentSchema = z.object({
  email: z.string().min(1),
  namespace: z.string().optional(),
});

const roleWriteSchema = z.object({
  roleKey: z.string().min(1).optional(),
  displayName: z.string().min(1),
  description: z.string().optional(),
  permissions: z.array(
    z.object({
      permissionType: z.string(),
      resourceType: z.string(),
      namespace: z.string().optional(),
    }),
  ).min(1),
});

export type RolePermissionGrant = z.infer<typeof rolePermissionSchema>;
export type RoleDetail = z.infer<typeof roleDetailSchema>;
export type RoleCreateRequest = z.infer<typeof roleWriteSchema> & { roleKey: string };
export type RoleUpdateRequest = Omit<z.infer<typeof roleWriteSchema>, 'roleKey'>;

export async function getRoles(): Promise<RoleDetail[]> {
  const response = await apiClient.get('/api/v1/admin/roles');
  return parseApiResponse(response.data, z.array(roleDetailSchema));
}

export async function getRole(roleId: number): Promise<RoleDetail> {
  const response = await apiClient.get(`/api/v1/admin/roles/${roleId}`);
  return parseApiResponse(response.data, roleDetailSchema);
}

export async function createRole(payload: RoleCreateRequest): Promise<RoleDetail> {
  const parsed = roleWriteSchema.extend({ roleKey: z.string().min(1) }).parse(payload);
  const response = await apiClient.post('/api/v1/admin/roles', parsed);
  return parseApiResponse(response.data, roleDetailSchema);
}

export async function updateRole(roleId: number, payload: RoleUpdateRequest): Promise<RoleDetail> {
  const parsed = roleWriteSchema.omit({ roleKey: true }).parse(payload);
  const response = await apiClient.put(`/api/v1/admin/roles/${roleId}`, parsed);
  return parseApiResponse(response.data, roleDetailSchema);
}

export async function deleteRole(roleId: number): Promise<void> {
  const response = await apiClient.delete(`/api/v1/admin/roles/${roleId}`);
  parseApiResponse(response.data, z.any());
}

export async function assignRole(roleId: number, email: string, namespace?: string): Promise<void> {
  const payload = roleAssignmentSchema.parse({ email, namespace });
  const response = await apiClient.post(`/api/v1/admin/roles/${roleId}/assign`, payload);
  parseApiResponse(response.data, z.any());
}

export async function revokeRole(roleId: number, email: string, namespace?: string): Promise<void> {
  const payload = roleAssignmentSchema.parse({ email, namespace });
  const response = await apiClient.delete(`/api/v1/admin/roles/${roleId}/assign`, {
    data: payload,
  });
  parseApiResponse(response.data, z.any());
}

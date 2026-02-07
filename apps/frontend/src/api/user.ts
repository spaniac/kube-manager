import apiClient from '@api/client';
import type { ApiResponse } from '../types/api';
import { z } from 'zod';
import { parseApiResponse } from '@utils/apiResponse';
import {
    userProfileSchema,
    sessionSchema,
    apiResponseSchema,
    resourceListSchema,
} from '../types/schemas';
import type { UserProfile, Session } from '../types/api';

export async function getUserProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/api/v1/users/profile');
    return parseApiResponse(response.data, userProfileSchema);
}

export async function getUserSessions(): Promise<Session[]> {
    const response = await apiClient.get<ApiResponse<Session[]>>('/api/v1/users/sessions');
    return parseApiResponse(response.data, z.array(sessionSchema));
}

export async function revokeSession(sessionId: number): Promise<void> {
    const response = await apiClient.delete<ApiResponse<void>>(
        `/api/v1/users/sessions/${sessionId}`
    );
    parseApiResponse(response.data, z.undefined());
}

export async function revokeAllSessions(): Promise<void> {
    const response = await apiClient.delete<ApiResponse<void>>(
        '/api/v1/users/sessions/revoke-all'
    );
    parseApiResponse(response.data, z.undefined());
}

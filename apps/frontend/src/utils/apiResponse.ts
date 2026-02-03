import { z } from 'zod';
import { apiResponseSchema } from '../types/schemas';

export function parseApiResponse<T>(
  response: unknown,
  dataSchema: z.ZodType<T>,
): T {
  const validatedResponse = apiResponseSchema(dataSchema).safeParse(response);

  if (!validatedResponse.success || !validatedResponse.data) {
    throw new Error(
      validatedResponse.error?.detail ||
        validatedResponse.error?.title ||
        validatedResponse.message ||
        'API request failed',
    );
  }

  // Check if response indicates failure
  if (validatedResponse.data.success === false) {
    throw new Error(
      validatedResponse.data.error?.detail ||
        validatedResponse.data.error?.title ||
        validatedResponse.data.message ||
        'API request failed',
    );
  }

  try {
    const validatedData = dataSchema.parse(validatedResponse.data.data);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues.map(i => i.message).join(', '));
    }
    throw error;
  }
}

export function handleApiError(error: unknown): Error {
  if (error instanceof Error) {
    // Check if it's an Axios error with response data that matches our schema
    const axiosError = error as any;
    if (axiosError.response?.data) {
      const apiResponse = apiResponseSchema(z.any()).safeParse(axiosError.response.data);
      if (apiResponse.success && apiResponse.data.error) {
         const apiError = apiResponse.data.error;
         return new Error(
           apiError.detail || 
           apiError.title || 
           apiResponse.data.message || 
           'Unknown error'
         );
      }
    }
    return error;
  }

  const apiResponse = apiResponseSchema(z.any()).safeParse(error);

  if (!apiResponse.success || !apiResponse.data) {
    return new Error('An unexpected error occurred');
  }

  if (apiResponse.data.error) {
    return new Error(
      apiResponse.data.error.detail ||
        apiResponse.data.error.title ||
        apiResponse.data.message ||
        'Unknown error'
    );
  }

  return new Error(apiResponse.data.message || 'An unexpected error occurred');
}

export function isApiError(error: unknown): error is { status?: number; data?: unknown } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as any).status === 'number'
  );
}

export function extractErrorCode(error: unknown): string | undefined {
  const apiResponse = apiResponseSchema(z.any()).safeParse(error);

  if (apiResponse.success && apiResponse.data.error) {
    return apiResponse.data.error.errorCode;
  }

  return undefined;
}

export function shouldRetry(error: unknown): boolean {
  const apiResponse = apiResponseSchema(z.any()).safeParse(error);

  if (!apiResponse.success) {
    return false;
  }

  if (!apiResponse.data.status) {
    return false;
  }

  const status = apiResponse.data.status;

  return status >= 500 || status === 408 || status === 429;
}

export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  const apiResponse = apiResponseSchema(z.any()).safeParse(error);

  if (!apiResponse.success || !apiResponse.data) {
    return 'An unexpected error occurred';
  }

  if (apiResponse.data.error) {
    const apiError = apiResponse.data.error;
    return apiError.detail || apiError.title || apiResponse.data.message || 'Unknown error';
  }

  return apiResponse.data.message || 'An unexpected error occurred';
}

export function parsePaginationParams(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): string {
  const queryParams = new URLSearchParams();

  if (params.page !== undefined) {
    queryParams.set('page', params.page.toString());
  }

  if (params.limit !== undefined) {
    queryParams.set('limit', params.limit.toString());
  }

  if (params.sortBy) {
    queryParams.set('sortBy', params.sortBy);
  }

  if (params.sortOrder) {
    queryParams.set('sortOrder', params.sortOrder);
  }

  return queryParams.toString();
}

export function parseFilterParams(filters: Record<string, string | string[]>): string {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      queryParams.set(key, value);
    }
  });

  return queryParams.toString();
}

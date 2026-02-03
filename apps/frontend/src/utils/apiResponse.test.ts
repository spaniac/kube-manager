import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  parseApiResponse,
  handleApiError,
  isApiError,
  extractErrorCode,
  shouldRetry,
  formatErrorMessage,
  parsePaginationParams,
  parseFilterParams,
} from '@utils/apiResponse';
import { z } from 'zod';

describe('parseApiResponse', () => {
  it('should parse valid API response with success', () => {
    const response = { success: true, data: { result: 'success' } };
    const schema = z.object({ result: z.string() });
    const result = parseApiResponse(response, schema);
    expect(result).toEqual({ result: 'success' });
  });

  it('should throw error for invalid response', () => {
    const response = { success: false, error: { detail: 'Validation failed', status: 400 } };
    const schema = z.object({ result: z.string() });
    expect(() => parseApiResponse(response, schema)).toThrow('Validation failed');
  });

  it('should throw error with message when detail is missing', () => {
    const response = { success: false, message: 'Generic error', status: 500 };
    const schema = z.object({ result: z.string() });
    expect(() => parseApiResponse(response, schema)).toThrow('Generic error');
  });

  it('should throw error with default message', () => {
    const response = { success: false, status: 500 };
    const schema = z.object({ result: z.string() });
    expect(() => parseApiResponse(response, schema)).toThrow('API request failed');
  });
});

describe('handleApiError', () => {
  it('should return error instance for Error', () => {
    const error = new Error('Test error');
    const result = handleApiError(error);
    expect(result).toBe(error);
  });

  it('should handle API error response with detail', () => {
    const error = { success: false, error: { detail: 'API error occurred', status: 400 } };
    const result = handleApiError(error);
    expect(result.message).toBe('API error occurred');
  });

  it('should handle API error response with title', () => {
    const error = { success: false, error: { title: 'Error Title', status: 400 } };
    const result = handleApiError(error);
    expect(result.message).toBe('Error Title');
  });

  it('should handle API error response with message', () => {
    const error = { success: false, message: 'Error message', status: 400 };
    const result = handleApiError(error);
    expect(result.message).toBe('Error message');
  });

  it('should return generic error for unknown error', () => {
    const error = null;
    const result = handleApiError(error);
    expect(result.message).toBe('An unexpected error occurred');
  });
});

describe('isApiError', () => {
  it('should return true for API error object', () => {
    const error = { status: 404, data: {} };
    expect(isApiError(error)).toBe(true);
  });

  it('should return false for null', () => {
    expect(isApiError(null)).toBe(false);
  });

  it('should return false for object without status', () => {
    const error = { data: {} };
    expect(isApiError(error)).toBe(false);
  });

  it('should return false for non-object', () => {
    expect(isApiError('string')).toBe(false);
  });
});

describe('extractErrorCode', () => {
  it('should extract error code from API response', () => {
    const error = { success: false, error: { errorCode: 'ERR_001', status: 400 } };
    expect(extractErrorCode(error)).toBe('ERR_001');
  });

  it('should return undefined for missing error code', () => {
    const error = { success: false, error: {}, status: 400 };
    expect(extractErrorCode(error)).toBeUndefined();
  });

  it('should return undefined for invalid response', () => {
    expect(extractErrorCode(null)).toBeUndefined();
  });
});

describe('shouldRetry', () => {
  it('should return true for 500 status', () => {
    const error = { success: false, status: 500 };
    expect(shouldRetry(error)).toBe(true);
  });

  it('should return true for 408 status', () => {
    const error = { success: false, status: 408 };
    expect(shouldRetry(error)).toBe(true);
  });

  it('should return true for 429 status', () => {
    const error = { success: false, status: 429 };
    expect(shouldRetry(error)).toBe(true);
  });

  it('should return false for 404 status', () => {
    const error = { success: false, status: 404 };
    expect(shouldRetry(error)).toBe(false);
  });

  it('should return false for 400 status', () => {
    const error = { success: false, status: 400 };
    expect(shouldRetry(error)).toBe(false);
  });

  it('should return false for missing status', () => {
    const error = { success: false };
    expect(shouldRetry(error)).toBe(false);
  });

  it('should return false for invalid response', () => {
    expect(shouldRetry(null)).toBe(false);
  });
});

describe('formatErrorMessage', () => {
  it('should return message from Error instance', () => {
    const error = new Error('Test error');
    expect(formatErrorMessage(error)).toBe('Test error');
  });

  it('should extract detail from API error', () => {
    const error = { success: false, error: { detail: 'Detailed error', status: 400 } };
    expect(formatErrorMessage(error)).toBe('Detailed error');
  });

  it('should extract title from API error', () => {
    const error = { success: false, error: { title: 'Error Title', status: 400 } };
    expect(formatErrorMessage(error)).toBe('Error Title');
  });



  it('should return default message for unknown error', () => {
    expect(formatErrorMessage(null)).toBe('An unexpected error occurred');
  });
});

describe('parsePaginationParams', () => {
  it('should parse all params', () => {
    const params = {
      page: 1,
      limit: 10,
      sortBy: 'name',
      sortOrder: 'asc' as const,
    };
    const result = parsePaginationParams(params);
    expect(result).toBe('page=1&limit=10&sortBy=name&sortOrder=asc');
  });

  it('should parse partial params', () => {
    const params = { page: 2 };
    const result = parsePaginationParams(params);
    expect(result).toBe('page=2');
  });

  it('should handle empty params', () => {
    const params = {};
    const result = parsePaginationParams(params);
    expect(result).toBe('');
  });

  it('should handle undefined values', () => {
    const params = { page: undefined, limit: undefined };
    const result = parsePaginationParams(params);
    expect(result).toBe('');
  });

  it('should handle desc sortOrder', () => {
    const params = { sortOrder: 'desc' as const };
    const result = parsePaginationParams(params);
    expect(result).toBe('sortOrder=desc');
  });
});

describe('parseFilterParams', () => {
  it('should parse string filters', () => {
    const filters = { name: 'test', status: 'active' };
    const result = parseFilterParams(filters);
    expect(result).toBe('name=test&status=active');
  });

  it('should parse array filters', () => {
    const filters = { tags: ['tag1', 'tag2', 'tag3'] };
    const result = parseFilterParams(filters);
    expect(result).toBe('tags=tag1&tags=tag2&tags=tag3');
  });

  it('should parse mixed filters', () => {
    const filters = { name: 'test', tags: ['tag1', 'tag2'] };
    const result = parseFilterParams(filters);
    expect(result).toBe('name=test&tags=tag1&tags=tag2');
  });

  it('should handle empty filters', () => {
    const filters = {};
    const result = parseFilterParams(filters);
    expect(result).toBe('');
  });
});

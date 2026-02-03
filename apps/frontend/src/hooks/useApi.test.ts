import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useApiQuery } from '@/hooks/useApi';

describe('useApiQuery Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const queryFn = vi.fn().mockResolvedValue({ data: ['item1', 'item2'] });
    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn));

    await waitFor(() => {
      expect(result.current.data).toEqual(['item1', 'item2']);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(queryFn).toHaveBeenCalledWith(['test-key']);
  });

  it('should handle loading state', async () => {
    const queryFn = vi.fn().mockImplementation(
      () => new Promise(() => {})
    );
    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    const queryFn = vi.fn().mockRejectedValue(new Error('API Error'));
    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn));

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error).toHaveProperty('message', 'API Error');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    expect(queryFn).toHaveBeenCalledWith(['test-key']);
  });

  it('should retry on failure up to 3 times', async () => {
    const queryFn = vi.fn()
      .mockRejectedValueOnce(new Error('Error 1'))
      .mockRejectedValueOnce(new Error('Error 2'))
      .mockRejectedValueOnce(new Error('Error 3'))
      .mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(queryFn).toHaveBeenCalledTimes(4); // 3 failures + 1 success
    });
  });

  it('should not retry after max retries', async () => {
    const queryFn = vi.fn()
      .mockRejectedValue(new Error('Error 1'))
      .mockRejectedValue(new Error('Error 2'))
      .mockRejectedValue(new Error('Error 3'))
      .mockRejectedValue(new Error('Error 4'))
      .mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn));

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(queryFn).toHaveBeenCalledTimes(4); // Stops after 4 attempts (3 failures + 1 final)
    });
  });
});

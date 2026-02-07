import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useApiQuery } from '@/hooks/useApi';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 3 },
      mutations: { retry: 3 },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useApiQuery Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = ['item1', 'item2'];
    const queryFn = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(queryFn).toHaveBeenCalled();
  });

  it('should handle loading state', async () => {
    const queryFn = vi.fn().mockImplementation(
      () => new Promise(() => {})
    );
    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    const queryFn = vi.fn().mockRejectedValue(new Error('API Error'));
    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn), { wrapper });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(true);
        expect(result.current.data).toBeUndefined();
      },
      { timeout: 10000 }
    );

    expect(queryFn).toHaveBeenCalled();
  });

  it('should retry on failure up to 3 times', async () => {
    const queryFn = vi.fn()
      .mockRejectedValueOnce(new Error('Error 1'))
      .mockRejectedValueOnce(new Error('Error 2'))
      .mockRejectedValueOnce(new Error('Error 3'))
      .mockResolvedValueOnce([]);

    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn), { wrapper });

    await waitFor(
      () => {
        expect(result.current.data).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
        expect(queryFn).toHaveBeenCalledTimes(4);
      },
      { timeout: 10000 }
    );
  });

  it('should not retry after max retries', async () => {
    const queryFn = vi.fn()
      .mockRejectedValueOnce(new Error('Error 1'))
      .mockRejectedValueOnce(new Error('Error 2'))
      .mockRejectedValueOnce(new Error('Error 3'))
      .mockRejectedValueOnce(new Error('Error 4'));

    const { result } = renderHook(() => useApiQuery(['test-key'], queryFn), { wrapper });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(true);
        expect(queryFn).toHaveBeenCalledTimes(4);
      },
      { timeout: 10000 }
    );
  });
});

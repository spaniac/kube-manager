import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import { handleApiError } from '@utils/apiResponse';

export function useApiQuery<T>(
  queryKey: unknown[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

export function useApiMutation<TData, TVariables, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, Error, TVariables, TContext>,
    'mutationFn'
  >,
) {
  return useMutation({
    mutationFn,
    onError: (error, variables, context, mutation) => {
      const errorMessage = handleApiError(error);
      console.error('Mutation error:', errorMessage);
      options?.onError?.(error, variables, context, mutation);
    },
    ...options,
  });
}

export function useApiInfiniteQuery<T>(
  queryKey: unknown[],
  queryFn: (context: { pageParam?: unknown }) => Promise<{
    data: T[];
    nextPage?: number;
  }>,
  options?: Omit<
    UseQueryOptions<{
      data: T[];
      nextPage?: number;
    }>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

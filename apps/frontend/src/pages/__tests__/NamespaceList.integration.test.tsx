import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import NamespaceList from '../NamespaceList';
import { ToastProvider } from '@components/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// MSW server setup with handlers
const server = setupServer(
  http.get('/api/v1/namespaces', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          name: 'default',
          status: 'Active',
          creationTimestamp: 1704451200000,
          labels: { env: 'production' }
        },
        {
          name: 'kube-system',
          status: 'Active',
          creationTimestamp: 1704451260000,
          labels: { env: 'production' }
        }
      ]
    });
  })
);

describe('NamespaceList Integration Tests', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <NamespaceList />
        </ToastProvider>
      </QueryClientProvider>
    );
    
    // Wait for component to render
    await waitFor(
      () => {
        const table = screen.queryByRole('table');
        return table !== null;
      },
      { timeout: 3000 }
    );
    
    // Verify table exists
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});

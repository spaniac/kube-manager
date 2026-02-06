import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Define your handlers here
export const handlers = [
  http.get('/api/v1/namespaces', () => {
    return HttpResponse.json([{ name: 'default' }, { name: 'kube-system' }]);
  }),
  http.get('/api/v1/error-test', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
  }),
  // Add auth refresh handler if needed
  // http.post('/api/v1/auth/refresh', () => {
  //   return HttpResponse.json({ token: 'new-token' });
  // }),
];

export const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-off error cases.)
afterEach(() => server.resetHandlers());

// Stop the server after all tests
afterAll(() => server.close());

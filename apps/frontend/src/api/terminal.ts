import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse } from '@utils/apiResponse';
import {
  apiResponseSchema,
  terminalSessionInfoSchema,
} from '../types/schemas';
import type {
  TerminalSessionInfo,
  TerminalResizeRequest,
  TerminalCommandRequest,
  TerminalSession,
  ApiResponse,
} from '../types/api';

export async function connectTerminal(params: {
  namespace: string;
  podName: string;
  container?: string;
}): Promise<TerminalSessionInfo> {
  const queryParams = new URLSearchParams();
  if (params.container) {
    queryParams.set('container', params.container);
  }

  const response = await apiClient.get<ApiResponse<TerminalSessionInfo>>(
    `/api/v1/terminal/connect/${encodeURIComponent(params.namespace)}/${encodeURIComponent(params.podName)}?${queryParams.toString()}`,
  );
  return parseApiResponse(response.data, apiResponseSchema(terminalSessionInfoSchema)).data!;
}

export async function getActiveSessions(): Promise<Record<string, TerminalSession>> {
  const response = await apiClient.get<ApiResponse<Record<string, TerminalSession>>>(
    '/api/v1/terminal/sessions',
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.record(
        z.object({
          sessionId: z.string(),
          namespace: z.string(),
          podName: z.string(),
          container: z.string(),
        }),
      ),
    ),
  ).data!;
}

export async function closeTerminal(sessionId: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/terminal/sessions/${encodeURIComponent(sessionId)}`,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function resizeTerminal(
  sessionId: string,
  request: TerminalResizeRequest,
): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(
    `/api/v1/terminal/sessions/${encodeURIComponent(sessionId)}/resize`,
    request,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function sendTerminalCommand(
  sessionId: string,
  request: TerminalCommandRequest,
): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(
    `/api/v1/terminal/sessions/${encodeURIComponent(sessionId)}/command`,
    request,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function interruptTerminal(sessionId: string): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(
    `/api/v1/terminal/sessions/${encodeURIComponent(sessionId)}/interrupt`,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export type TerminalWebSocketCallbacks = {
  onOpen?: () => void;
  onMessage?: (data: string | Uint8Array) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (error: Event) => void;
};

export function createTerminalWebSocket(
  sessionId: string,
  callbacks: TerminalWebSocketCallbacks,
): WebSocket {
  const wsUrl = `${(import.meta.env.VITE_WS_BASE_URL || '').replace(
    'http',
    'ws',
  )}/api/v1/terminal/ws?sessionId=${encodeURIComponent(sessionId)}`;

  const ws = new WebSocket(wsUrl);

  ws.onopen = callbacks.onOpen;
  ws.onmessage = (event) => {
    if (event.data instanceof Blob) {
      // Handle binary data
      event.data.arrayBuffer().then((buffer) => {
        callbacks.onMessage?.(new Uint8Array(buffer));
      });
    } else {
      // Handle text data
      callbacks.onMessage?.(event.data);
    }
  };
  ws.onclose = callbacks.onClose;
  ws.onerror = callbacks.onError;

  return ws;
}

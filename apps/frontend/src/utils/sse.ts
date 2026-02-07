export class SSEClient {
  private eventSource: EventSource | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private retryCount = 0;
  private maxRetries = 5;
  private reconnectDelay = 1000;

  constructor(private url: string) {}

  connect(): void {
    if (this.eventSource?.readyState === EventSource.OPEN) {
      return;
    }

    this.disconnect();

    this.eventSource = new EventSource(this.url);

    this.eventSource.addEventListener('message', (event) => {
      this.handleMessage(event);
    });

    this.eventSource.addEventListener('error', (error) => {
      console.error('SSE error:', error);
      this.handleReconnect();
    });

    this.eventSource.addEventListener('open', () => {
      console.log('SSE connection opened');
      this.retryCount = 0;
    });
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  on(event: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const listenerSet = this.listeners.get(event)!;
    listenerSet.add(callback);

    return () => {
      listenerSet.delete(callback);
      if (listenerSet.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  once(event: string, callback: (data: any) => void): void {
    const unsubscribe = this.on(event, (data) => {
      callback(data);
      unsubscribe();
    });
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);

      const eventType = data.type || 'message';
      const listeners = this.listeners.get(eventType);

      if (listeners) {
        listeners.forEach((callback) => callback(data));
      }
    } catch (error) {
      console.error('Failed to parse SSE message:', error);
    }
  }

  private handleReconnect(): void {
    if (this.retryCount >= this.maxRetries) {
      console.error('Max retry attempts reached');
      this.disconnect();
      return;
    }

    this.retryCount++;

    const delay = this.reconnectDelay * Math.pow(2, this.retryCount - 1);
    console.log(`Reconnecting in ${delay}ms (attempt ${this.retryCount})`);

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN;
  }
}

export function createSSEClient(url: string): SSEClient {
  return new SSEClient(url);
}

export function createLogsSSEUrl(
  namespace: string,
  podName: string,
  container?: string,
  params?: {
    sinceTime?: number;
    follow?: boolean;
    tailLines?: number;
    filter?: string;
  },
): string {
  const baseUrl = `/api/v1/pods/${namespace}/${podName}/logs/stream`;
  const queryParams = new URLSearchParams();

  if (container) {
    queryParams.set('container', container);
  }

  if (params?.sinceTime) {
    queryParams.set('sinceTime', params.sinceTime.toString());
  }

  if (params?.follow !== undefined) {
    queryParams.set('follow', params.follow.toString());
  }

  if (params?.tailLines) {
    queryParams.set('tailLines', params.tailLines.toString());
  }

  if (params?.filter) {
    queryParams.set('filter', params.filter);
  }

  return `${baseUrl}?${queryParams.toString()}`;
}

export function createMetricsSSEUrl(
  resourceType: string,
  resourceName: string,
  namespace?: string,
): string {
  const baseUrl = `/api/v1/metrics/${resourceType}/${resourceName}/stream`;
  const queryParams = new URLSearchParams();

  if (namespace) {
    queryParams.set('namespace', namespace);
  }

  return `${baseUrl}?${queryParams.toString()}`;
}

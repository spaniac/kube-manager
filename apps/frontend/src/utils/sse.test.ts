import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SSEClient, createSSEClient, createLogsSSEUrl, createMetricsSSEUrl } from '@utils/sse';

// Mock EventSource
class MockEventSource {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 2;

  readyState = MockEventSource.CONNECTING;
  url: string;
  eventListeners: Map<string, Set<Function>> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  addEventListener(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback);
  }

  removeEventListener(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  dispatchEvent(event: any) {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }

  close() {
    this.readyState = MockEventSource.CLOSED;
  }

  // Helper for testing
  simulateMessage(data: any) {
    const event = { type: 'message', data: JSON.stringify(data) };
    this.dispatchEvent(event);
  }

  simulateError() {
    const event = { type: 'error' };
    this.dispatchEvent(event);
  }

  simulateOpen() {
    this.readyState = MockEventSource.OPEN;
    const event = { type: 'open' };
    this.dispatchEvent(event);
  }
}

vi.stubGlobal('EventSource', MockEventSource);

describe('SSEClient', () => {
  let client: SSEClient;
  const testUrl = 'http://test.com/stream';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    client = new SSEClient(testUrl);
  });

  afterEach(() => {
    vi.useRealTimers();
    client.disconnect();
  });

  describe('connect', () => {
    it('should create EventSource connection', () => {
      client.connect();
      expect(client.isConnected()).toBe(false); // Not yet open
    });

    it('should not reconnect if already connected', () => {
      client.connect();
      (client as any).eventSource.simulateOpen();
      const disconnectSpy = vi.spyOn(client as any, 'disconnect');
      client.connect();
      expect(disconnectSpy).not.toHaveBeenCalled();
    });

    it('should disconnect existing connection before connecting', () => {
      const disconnectSpy = vi.spyOn(client as any, 'disconnect');
      client.connect();
      client.connect();
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('disconnect', () => {
    it('should close EventSource connection', () => {
      client.connect();
      client.disconnect();
      expect(client.isConnected()).toBe(false);
    });

    it('should handle disconnect when not connected', () => {
      expect(() => client.disconnect()).not.toThrow();
    });
  });

  describe('on', () => {
    it('should register event listener', () => {
      const callback = vi.fn();
      client.connect();
      const unsubscribe = client.on('message', callback);
      (client as any).eventSource.simulateMessage({ type: 'message', data: 'test' });
      expect(callback).toHaveBeenCalledWith({ type: 'message', data: 'test' });
      unsubscribe();
    });

    it('should return unsubscribe function', () => {
      const callback = vi.fn();
      client.connect();
      const unsubscribe = client.on('message', callback);
      unsubscribe();
      (client as any).eventSource.simulateMessage({ type: 'message', data: 'test' });
      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple listeners for same event', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      client.connect();
      client.on('message', callback1);
      client.on('message', callback2);
      (client as any).eventSource.simulateMessage({ type: 'message', data: 'test' });
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('should use message type by default', () => {
      const callback = vi.fn();
      client.connect();
      client.on('message', callback);
      (client as any).eventSource.simulateMessage({ data: 'test' });
      expect(callback).toHaveBeenCalled();
    });

    it('should handle custom event types', () => {
      const callback = vi.fn();
      client.connect();
      client.on('custom', callback);
      (client as any).eventSource.simulateMessage({ type: 'custom', data: 'test' });
      expect(callback).toHaveBeenCalled();
    });

    it('should remove listener when all unsubscribed', () => {
      const callback = vi.fn();
      client.connect();
      const unsubscribe = client.on('message', callback);
      unsubscribe();
      expect((client as any).listeners.has('message')).toBe(false);
    });

    it('should not remove other listeners when one is unsubscribed', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      client.connect();
      const unsubscribe1 = client.on('message', callback1);
      client.on('message', callback2);
      unsubscribe1();
      expect((client as any).listeners.has('message')).toBe(true);
    });
  });

  describe('once', () => {
    it('should call callback only once', () => {
      const callback = vi.fn();
      client.connect();
      client.once('message', callback);
      (client as any).eventSource.simulateMessage({ type: 'message', data: 'test1' });
      (client as any).eventSource.simulateMessage({ type: 'message', data: 'test2' });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('isConnected', () => {
    it('should return false when not connected', () => {
      expect(client.isConnected()).toBe(false);
    });

    it('should return true when connected', () => {
      client.connect();
      (client as any).eventSource.simulateOpen();
      expect(client.isConnected()).toBe(true);
    });

    it('should return false after disconnect', () => {
      client.connect();
      (client as any).eventSource.simulateOpen();
      client.disconnect();
      expect(client.isConnected()).toBe(false);
    });
  });

  describe('reconnection logic', () => {
    it('should attempt reconnection on error', () => {
      const connectSpy = vi.spyOn(client as any, 'connect');
      client.connect();
      (client as any).eventSource.simulateError();
      vi.advanceTimersByTime(1000);
      expect(connectSpy).toHaveBeenCalledTimes(2);
    });

    it('should stop retrying after max attempts', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      client.connect();
      for (let i = 0; i < 6; i++) {
        (client as any).eventSource.simulateError();
        vi.advanceTimersByTime(1000 * Math.pow(2, i));
      }
      expect(consoleSpy).toHaveBeenCalledWith('Max retry attempts reached');
      consoleSpy.mockRestore();
    });

    it('should reset retry count on successful connection', () => {
      client.connect();
      (client as any).eventSource.simulateError();
      vi.advanceTimersByTime(1000);
      (client as any).eventSource.simulateOpen();
      expect((client as any).retryCount).toBe(0);
    });
  });

  describe('message handling', () => {
    it('should parse valid JSON messages', () => {
      const callback = vi.fn();
      client.connect();
      client.on('test', callback);
      (client as any).eventSource.simulateMessage({ type: 'test', data: 'value' });
      expect(callback).toHaveBeenCalledWith({ type: 'test', data: 'value' });
    });

    it('should handle invalid JSON gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      client.connect();
      // Manually trigger the message handler with invalid JSON
      const handleMessage = (client as any).handleMessage.bind(client);
      handleMessage({ data: 'invalid json' });
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse SSE message:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});

describe('createSSEClient', () => {
  it('should create SSEClient instance', () => {
    const client = createSSEClient('http://test.com/stream');
    expect(client).toBeInstanceOf(SSEClient);
  });
});

describe('createLogsSSEUrl', () => {
  it('should create basic logs URL', () => {
    const url = createLogsSSEUrl('default', 'test-pod');
    expect(url).toBe('/api/v1/pods/default/test-pod/logs/stream?');
  });

  it('should include container parameter', () => {
    const url = createLogsSSEUrl('default', 'test-pod', 'container-1');
    expect(url).toContain('container=container-1');
  });

  it('should include sinceTime parameter', () => {
    const url = createLogsSSEUrl('default', 'test-pod', undefined, { sinceTime: 123456 });
    expect(url).toContain('sinceTime=123456');
  });

  it('should include follow parameter', () => {
    const url = createLogsSSEUrl('default', 'test-pod', undefined, { follow: true });
    expect(url).toContain('follow=true');
  });

  it('should include tailLines parameter', () => {
    const url = createLogsSSEUrl('default', 'test-pod', undefined, { tailLines: 100 });
    expect(url).toContain('tailLines=100');
  });

  it('should include filter parameter', () => {
    const url = createLogsSSEUrl('default', 'test-pod', undefined, { filter: 'error' });
    expect(url).toContain('filter=error');
  });

  it('should include all parameters', () => {
    const url = createLogsSSEUrl('default', 'test-pod', 'container-1', {
      sinceTime: 123456,
      follow: true,
      tailLines: 100,
      filter: 'error',
    });
    expect(url).toContain('container=container-1');
    expect(url).toContain('sinceTime=123456');
    expect(url).toContain('follow=true');
    expect(url).toContain('tailLines=100');
    expect(url).toContain('filter=error');
  });
});

describe('createMetricsSSEUrl', () => {
  it('should create basic metrics URL', () => {
    const url = createMetricsSSEUrl('pod', 'test-pod');
    expect(url).toBe('/api/v1/metrics/pod/test-pod/stream?');
  });

  it('should include namespace parameter', () => {
    const url = createMetricsSSEUrl('pod', 'test-pod', 'default');
    expect(url).toContain('namespace=default');
  });

  it('should handle all parameters', () => {
    const url = createMetricsSSEUrl('deployment', 'test-deployment', 'default');
    expect(url).toBe('/api/v1/metrics/deployment/test-deployment/stream?namespace=default');
  });
});

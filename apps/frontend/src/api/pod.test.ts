import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as podApi from '@api/pod';

describe('Pod API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export getPods function', () => {
    expect(typeof podApi.getPods).toBe('function');
  });

  it('should export getPod function', () => {
    expect(typeof podApi.getPod).toBe('function');
  });

  it('should export deletePod function', () => {
    expect(typeof podApi.deletePod).toBe('function');
  });

  it('should export getPodLogs function', () => {
    expect(typeof podApi.getPodLogs).toBe('function');
  });
});

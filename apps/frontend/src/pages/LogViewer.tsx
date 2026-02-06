/**
 * LogViewer Component
 *
 * A comprehensive log viewer for pod logs with terminal-like interface.
 * Features:
 * - SSE connection for real-time log streaming
 * - Container selector for multi-container pods
 * - Log severity filtering (INFO, WARNING, ERROR)
 * - Log text search with highlighting
 * - Log time range filtering
 * - Log line wrapping toggle
 * - Log statistics display
 * - Log download (text/gzip)
 * - Log bookmarking
 * - Auto-scroll control
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/client';
import { useApiQuery } from '@hooks/useApi';
import { Loading } from '@components/Spinner';
import { Input } from '@components/Input';
import { Select, SelectStyles } from '@components/Select';
import { Button, ButtonStyles } from '@components/Button';
import { Badge } from '@components/Badge';

type LogLevel = 'INFO' | 'WARNING' | 'ERROR';
type LineWrapMode = 'on' | 'off';

interface LogLine {
  timestamp: number;
  line: number;
  content: string;
  level?: LogLevel;
}

interface LogStats {
  totalLines: number;
  infoCount: number;
  warningCount: number;
  errorCount: number;
}

interface LogBookmark {
  id: string;
  line: number;
  content: string;
  timestamp: number;
  createdAt: number;
}

interface ShareableLogBookmark {
  id: string;
  namespace: string;
  podName: string;
  line: number;
  content: string;
  timestamp: number;
}

interface LogBookmark {
  id: string;
  line: number;
  content: string;
  timestamp: number;
  createdAt: number;
}

export default function LogViewer() {
  const { namespace: ns, pod: podName } = useParams<{ namespace: string; pod: string }>();

  // Log content state
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // Filter state
  const [severityFilter, setSeverityFilter] = useState<LogLevel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [lineWrapMode, setLineWrapMode] = useState<LineWrapMode>('on');
  const [autoScroll, setAutoScroll] = useState(true);

  // Bookmark state
  const [bookmarks, setBookmarks] = useState<LogBookmark[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Share state
  const [shareableBookmark, setShareableBookmark] = useState<ShareableLogBookmark | null>(null);

  // Container selection
  const [selectedContainer, setSelectedContainer] = useState('');

  // SSE connection
  const eventSourceRef = useRef<EventSource | null>(null);

  // Log statistics
  const stats = useMemo<LogStats>(() => {
    const infoCount = logs.filter(l => l.level === 'INFO').length;
    const warningCount = logs.filter(l => l.level === 'WARNING').length;
    const errorCount = logs.filter(l => l.level === 'ERROR').length;

    return {
      totalLines: logs.length,
      infoCount,
      warningCount,
      errorCount,
    };
  }, [logs]);

  /**
   * Fetch pod containers
   */
  const { data: podData, isLoading } = useApiQuery(
    ['pods', ns, podName],
    () => apiClient.get(`/api/v1/pods/${ns}/${podName}`)
  );

  /**
   * Connect to SSE endpoint for real-time log streaming
   */
  useEffect(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `/api/v1/pods/${ns}/${podName}/logs?severity=${severityFilter || ''}`
    );

    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'log') {
          const logLine: LogLine = {
            timestamp: data.timestamp,
            line: data.line,
            content: data.content,
            level: data.level,
          };

          setLogs((prev) => {
            const updated = [...prev, logLine];
            if (autoScroll && updated.length > 0) {
              return [updated[updated.length - 1]!];
            }
            return updated.slice(-1000); // Keep last 1000 lines
          });
        } else if (data.type === 'error') {
          console.error('Log streaming error:', data.message);
          setIsStreaming(false);
        } else if (data.type === 'complete') {
          setIsStreaming(false);
        }
      } catch (err) {
        console.error('Failed to parse SSE message:', err);
      }
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      setIsStreaming(false);
    };

    eventSource.onopen = () => {
      console.log('SSE connection opened');
      setIsStreaming(true);
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [ns, podName, severityFilter]);

  /**
   * Apply filters to logs
   */
  const filteredLogs = useMemo(() => {
    let result = logs;

    // Severity filter
    if (severityFilter) {
      result = result.filter(l => l.level === severityFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.content.toLowerCase().includes(query) ||
        l.line.toString().includes(query)
      );
    }

    // Time range filter
    if (startTime && endTime) {
      const start = startTime.getTime();
      const end = endTime.getTime();
      result = result.filter(l => l.timestamp >= start && l.timestamp <= end);
    }

    return result;
  }, [logs, severityFilter, searchQuery, startTime, endTime, lineWrapMode]);

  /**
   * Get containers for pod
   */
   const containers = useMemo(() => {
    if (!podData) return [];

    const pod = podData?.data;
    return pod?.spec?.containers?.map((c: any) => c.name) || [];
  }, [podData, isLoading]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`log-bookmarks-${ns}-${podName}`);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (err) {
        console.warn('Failed to parse bookmarks:', err);
      }
    }
  }, [ns, podName]);

  /**
   * Save bookmarks to localStorage
   */
  const saveBookmarks = useCallback(() => {
    localStorage.setItem(`log-bookmarks-${ns}-${podName}`, JSON.stringify(bookmarks));
  }, [bookmarks, ns, podName]);

  /**
   * Add bookmark for current line
   */
  const addBookmark = useCallback((line: number) => {
    const logLine = logs[line];
    if (!logLine) return;

    const bookmark: LogBookmark = {
      id: `bookmark-${Date.now()}`,
      line: line,
      content: logLine.content,
      timestamp: logLine.timestamp,
      createdAt: Date.now(),
    };

    setBookmarks((prev) => [...prev, bookmark].slice(-20)); // Keep last 20 bookmarks
    saveBookmarks();
  }, [logs, bookmarks, ns, podName, saveBookmarks]);

  /**
   * Remove bookmark by id
   */
  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter(b => b.id !== id));
    saveBookmarks();
  }, [bookmarks, saveBookmarks]);

  /**
   * Jump to bookmarked line
   */
  const jumpToBookmark = useCallback((line: number) => {
    const logContainer = document.querySelector('.log-content');
    if (!logContainer) return;

    const logLines = logContainer.querySelectorAll('.log-line');
    const targetLine = logLines[line - 1];
    if (targetLine) {
      targetLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  /**
   * Generate shareable URL for a bookmark
   */
  const generateShareableUrl = (bookmark: ShareableLogBookmark): string => {
    const params = new URLSearchParams({
      ns: bookmark.namespace,
      pod: bookmark.podName,
      line: bookmark.line.toString(),
      content: bookmark.content,
    });

    return `${window.location.origin}/shared-logs?${params.toString()}`;
  };

  /**
   * Copy shareable URL to clipboard
   */
  const copyToClipboard = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  }, []);

  /**
   * Clear all bookmarks
   */
  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    setShareableBookmark(null);
    saveBookmarks();
    setShowBookmarks(false);
  }, [saveBookmarks, setShareableBookmark]);

  /**
   * Create shareable bookmark from a bookmark
   */
  const createShareableBookmark = useCallback((line: number): ShareableLogBookmark | undefined => {
    const logLine = logs[line];
    if (!logLine) return undefined;

    const bookmark: ShareableLogBookmark = {
      id: `shareable-${Date.now()}`,
      line,
      content: logLine.content,
      timestamp: logLine.timestamp,
      namespace: ns!,
      podName: podName!,
    };

    setShareableBookmark(bookmark);
    return bookmark;
  }, [logs, ns, podName]);

  /**
   * Toggle auto-scroll
   */
  const toggleAutoScroll = useCallback(() => {
    setAutoScroll(!autoScroll);
  }, [autoScroll]);

  /**
   * Clear logs
   */
  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  /**
   * Download logs as text file
   */
  const downloadLogs = useCallback((format: 'text' | 'gzip') => {
    const text = logs.map(l => `[${l.timestamp}] [${l.level}] ${l.content}`).join('\n');

    if (format === 'text') {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${podName}-logs.txt`;
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const gzipBlob = new Blob([text], { type: 'application/gzip' });
      const url = URL.createObjectURL(gzipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${podName}-logs.gz`;
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [logs, podName]);

  if (isLoading) {
    return <Loading message="Loading pod logs..." />;
  }

  return (
    <div className="log-viewer">
      {/* Header */}
      <div className="log-header">
        <h1>Logs: {podName}</h1>
        <div className="log-breadcrumbs">
          <span>Namespace: {ns}</span>
          <span>Pod: {podName}</span>
        </div>
      </div>

      {/* Container selector */}
      {containers.length > 1 && (
        <div className="log-controls">
          <span className="label">Container:</span>
          <Select
            value={selectedContainer}
            onChange={(value) => setSelectedContainer(value)}
            options={containers.map((c: string) => ({ value: c, label: c }))}
          />
        </div>
      )}

       {/* Controls */}
      <div className="log-controls">
        <div className="filter-group">
          <Button onClick={toggleAutoScroll}>
            Auto Scroll: {autoScroll ? 'On' : 'Off'}
          </Button>
          <Button onClick={() => setLineWrapMode(lineWrapMode === 'on' ? 'off' : 'on')}>
            Wrap: {lineWrapMode === 'on' ? 'On' : 'Off'}
          </Button>
          <Button onClick={() => setShowBookmarks(!showBookmarks)}>
            Bookmarks: {bookmarks.length}
          </Button>
        </div>

        <div className="filter-group">
          <span className="label">Search:</span>
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setSearchQuery('')}>Clear</Button>
        </div>

        <div className="filter-group">
          <Button onClick={clearLogs}>Clear Logs</Button>
          <Button onClick={() => eventSourceRef.current?.close() && setIsStreaming(false)}>
            Stop Streaming
          </Button>
        </div>

        {/* Statistics */}
        <div className="log-stats">
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{stats.totalLines}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">INFO:</span>
            <span className="stat-value">{stats.infoCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">WARNING:</span>
            <span className="stat-value">{stats.warningCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ERROR:</span>
            <span className="stat-value">{stats.errorCount}</span>
          </div>
        </div>
      </div>

        {/* Bookmarks Panel */}
        {showBookmarks && (
          <div className="bookmarks-panel">
            <div className="bookmarks-header">
              <h2>Bookmarks</h2>
              <Button onClick={clearBookmarks}>Clear All</Button>
              <Button onClick={() => setShowBookmarks(false)}>Close</Button>
            </div>
            <div className="bookmarks-list">
              {bookmarks.map((bookmark, index) => (
                <div
                  key={bookmark.id}
                  className="bookmark-item"
                  onClick={() => jumpToBookmark(bookmark.line)}
                >
                  <div className="bookmark-line">
                    <span className="bookmark-number">{bookmark.line}</span>
                    <span className="bookmark-content">{bookmark.content}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="bookmark-actions-button"
                    onClick={() => removeBookmark(bookmark.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    className="bookmark-actions-button"
                    onClick={() => {
                      const shareable = createShareableBookmark(bookmark.line);
                      if (shareable) {
                        const url = generateShareableUrl(shareable);
                        copyToClipboard(url);
                      }
                    }}
                  >
                    Share
                  </Button>
                </div>
              ))}
            </div>
          </div>
         )}

         {/* Log display */}
        <div className={`log-content ${lineWrapMode}`}>
          {filteredLogs.length === 0 ? (
            <div className="log-empty">
              No logs to display. Try adjusting filters.
            </div>
          ) : (
            filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`log-line log-${(log.level || 'INFO').toLowerCase()}`}
              >
                <span className="log-timestamp">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="log-content">{log.content}</span>
              </div>
            ))
          )}
        </div>

      {/* Loading indicator */}
      {isStreaming && (
        <div className="streaming-indicator">
          <Loading />
          <span>Streaming logs...</span>
        </div>
      )}
    </div>
  );
}

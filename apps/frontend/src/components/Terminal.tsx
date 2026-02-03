import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import {
  connectTerminal,
  closeTerminal,
  resizeTerminal,
  sendTerminalCommand,
  interruptTerminal,
  createTerminalWebSocket,
} from '@api/terminal';
import type { PodContainer } from '@types/api';
import Button from './Button';
import Select from './Select';
import Badge from './Badge';
import { Toast } from './Toast';

interface TerminalProps {
  namespace: string;
  podName: string;
  containers: PodContainer[];
  initialContainer?: string;
  onClose?: () => void;
}

type TerminalTheme = 'dark' | 'light' | 'solarized' | 'solarized-light';
type TerminalShell = 'sh' | 'bash' | 'zsh';

const TERMINAL_THEMES: Record<
  TerminalTheme,
  { foreground: string; background: string; cursor: string; black: string; red: string; green: string; yellow: string; blue: string; magenta: string; cyan: string; white: string }
> = {
  dark: {
    foreground: '#f0f0f0',
    background: '#1e1e1e',
    cursor: '#f0f0f0',
    black: '#000000',
    red: '#cd3131',
    green: '#0dbc79',
    yellow: '#e5e510',
    blue: '#2472c8',
    magenta: '#bc3fbc',
    cyan: '#11a8cd',
    white: '#e5e5e5',
  },
  light: {
    foreground: '#333333',
    background: '#ffffff',
    cursor: '#333333',
    black: '#000000',
    red: '#cd3131',
    green: '#0dbc79',
    yellow: '#e5e510',
    blue: '#2472c8',
    magenta: '#bc3fbc',
    cyan: '#11a8cd',
    white: '#e5e5e5',
  },
  solarized: {
    foreground: '#839496',
    background: '#002b36',
    cursor: '#839496',
    black: '#073642',
    red: '#dc322f',
    green: '#859900',
    yellow: '#b58900',
    blue: '#268bd2',
    magenta: '#d33682',
    cyan: '#2aa198',
    white: '#eee8d5',
  },
  'solarized-light': {
    foreground: '#657b83',
    background: '#fdf6e3',
    cursor: '#657b83',
    black: '#073642',
    red: '#dc322f',
    green: '#859900',
    yellow: '#b58900',
    blue: '#268bd2',
    magenta: '#d33682',
    cyan: '#2aa198',
    white: '#eee8d5',
  },
};

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export default function Terminal({
  namespace,
  podName,
  containers,
  initialContainer,
  onClose,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const webLinksAddonRef = useRef<WebLinksAddon | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const currentInputRef = useRef<string>('');

  const [selectedContainer, setSelectedContainer] = useState<string>(
    initialContainer || (containers.length > 0 ? containers[0].name : ''),
  );
  const [selectedShell, setSelectedShell] = useState<TerminalShell>('bash');
  const [selectedTheme, setSelectedTheme] = useState<TerminalTheme>('dark');
  const [fontSize, setFontSize] = useState(14);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Reset session timeout on activity
  const resetSessionTimeout = useCallback(() => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    sessionTimeoutRef.current = setTimeout(() => {
      Toast.error('Terminal session timeout - closing connection');
      handleClose();
    }, SESSION_TIMEOUT);
  }, []);

  // Connect to terminal
  const connect = useCallback(async () => {
    try {
      setConnectionStatus('connecting');
      const sessionInfo = await connectTerminal({
        namespace,
        podName,
        container: selectedContainer,
      });
      sessionIdRef.current = sessionInfo.sessionId;

      // Create WebSocket connection
      const ws = createTerminalWebSocket(sessionInfo.sessionId, {
        onOpen: () => {
          setIsConnected(true);
          setConnectionStatus('connected');
          resetSessionTimeout();
          Toast.success('Terminal connected');
        },
        onMessage: (data: string | Uint8Array) => {
          if (xtermRef.current) {
            if (typeof data === 'string') {
              xtermRef.current.write(data);
            } else {
              xtermRef.current.write(data);
            }
            resetSessionTimeout();
          }
        },
        onClose: () => {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          sessionIdRef.current = null;
          if (wsRef.current) {
            wsRef.current = null;
          }
        },
        onError: (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('error');
          Toast.error('Terminal connection error');
        },
      });

      wsRef.current = ws;
    } catch (error: any) {
      console.error('Failed to connect to terminal:', error);
      setConnectionStatus('error');
      Toast.error(`Failed to connect: ${error.message}`);
    }
  }, [namespace, podName, selectedContainer, resetSessionTimeout]);

  // Disconnect from terminal
  const disconnect = useCallback(async () => {
    if (sessionIdRef.current) {
      try {
        await closeTerminal(sessionIdRef.current);
      } catch (error) {
        console.error('Failed to close terminal session:', error);
      }
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }

    setIsConnected(false);
    setConnectionStatus('disconnected');
    sessionIdRef.current = null;
  }, []);

  // Handle close
  const handleClose = useCallback(async () => {
    await disconnect();
    onClose?.();
  }, [disconnect, onClose]);

  // Handle terminal resize
  const handleResize = useCallback(() => {
    if (xtermRef.current && fitAddonRef.current) {
      fitAddonRef.current.fit();
      const dims = xtermRef.current;
      if (sessionIdRef.current) {
        resizeTerminal(sessionIdRef.current, {
          rows: dims.rows,
          columns: dims.cols,
        }).catch((error) => {
          console.error('Failed to resize terminal:', error);
        });
      }
    }
  }, []);

  // Clear screen
  const clearScreen = useCallback(() => {
    if (xtermRef.current) {
      xtermRef.current.clear();
    }
  }, []);

  // Send interrupt (Ctrl+C)
  const sendInterrupt = useCallback(async () => {
    if (sessionIdRef.current) {
      await interruptTerminal(sessionIdRef.current);
      resetSessionTimeout();
    }
  }, [resetSessionTimeout]);

  // Handle copy from terminal
  const handleCopy = useCallback(async () => {
    if (xtermRef.current) {
      const selection = xtermRef.current.getSelection();
      if (selection) {
        await navigator.clipboard.writeText(selection);
        Toast.success('Copied to clipboard');
        resetSessionTimeout();
      }
    }
  }, [resetSessionTimeout]);

  // Handle paste to terminal
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (xtermRef.current) {
        xtermRef.current.paste(text);
        resetSessionTimeout();
      }
    } catch (error) {
      console.error('Failed to paste:', error);
      Toast.error('Failed to paste from clipboard');
    }
  }, [resetSessionTimeout]);

  // Search in terminal
  const handleSearch = useCallback(
    (direction: 'next' | 'prev') => {
      if (xtermRef.current && searchTerm) {
        if (direction === 'next') {
          xtermRef.current.findNext(searchTerm);
        } else {
          xtermRef.current.findPrevious(searchTerm);
        }
        resetSessionTimeout();
      }
    },
    [searchTerm, resetSessionTimeout],
  );

  // Initialize xterm.js
  useEffect(() => {
    if (!terminalRef.current) return;

    const xterm = new XTerminal({
      cursorBlink: true,
      cursorStyle: 'block',
      fontSize,
      fontFamily: 'Consolas, "Courier New", monospace',
      theme: TERMINAL_THEMES[selectedTheme],
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    xterm.loadAddon(fitAddon);
    xterm.loadAddon(webLinksAddon);

    xterm.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;
    webLinksAddonRef.current = webLinksAddon;

    // Event handlers
    xterm.onData((data) => {
      currentInputRef.current = data;

      // Handle command history with arrow keys
      if (data === '\x1b[A') {
        // Up arrow
        if (commandHistoryRef.current.length > 0 && historyIndexRef.current < commandHistoryRef.current.length - 1) {
          historyIndexRef.current += 1;
          const command = commandHistoryRef.current[commandHistoryRef.current.length - 1 - historyIndexRef.current];
          // This is a simplified approach - real implementation needs more complex handling
        }
      } else if (data === '\x1b[B') {
        // Down arrow
        if (historyIndexRef.current > 0) {
          historyIndexRef.current -= 1;
        }
      } else if (data === '\t') {
        // Tab completion
        const currentLine = currentInputRef.current;
        // Send tab to server for completion
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send('\t');
        }
      } else if (data === '\x03') {
        // Ctrl+C
        sendInterrupt();
      } else if (data === '\r') {
        // Enter - add to history
        if (currentInputRef.current.trim()) {
          commandHistoryRef.current = [...commandHistoryRef.current, currentInputRef.current];
          historyIndexRef.current = -1;
        }
      }

      // Send data to WebSocket
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(data);
      }
      resetSessionTimeout();
    });

    // Handle copy on selection
    xterm.onSelectionChange(() => {
      // Selection changed - user can copy
    });

    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      xterm.dispose();
    };
  }, [fontSize, selectedTheme, handleResize, sendInterrupt, resetSessionTimeout]);

  // Reconnect when container or shell changes
  useEffect(() => {
    if (isConnected) {
      disconnect();
    }
    const timeout = setTimeout(() => {
      connect();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedContainer, selectedShell, connect, disconnect, isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // Update terminal theme when changed
  useEffect(() => {
    if (xtermRef.current) {
      xtermRef.current.options.theme = TERMINAL_THEMES[selectedTheme];
    }
  }, [selectedTheme]);

  // Update font size when changed
  useEffect(() => {
    if (xtermRef.current) {
      xtermRef.current.options.fontSize = fontSize;
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    }
  }, [fontSize]);

  // Status badge color
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'success';
      case 'connecting':
        return 'info';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Terminal toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          {/* Container selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-300">Container:</label>
            <Select
              value={selectedContainer}
              onChange={setSelectedContainer}
              options={containers.map((c) => ({ value: c.name, label: c.name }))}
              className="w-48"
            />
          </div>

          {/* Shell selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-300">Shell:</label>
            <Select
              value={selectedShell}
              onChange={(value) => setSelectedShell(value as TerminalShell)}
              options={[
                { value: 'bash', label: 'bash' },
                { value: 'sh', label: 'sh' },
                { value: 'zsh', label: 'zsh' },
              ]}
              className="w-32"
            />
          </div>

          {/* Connection status */}
          <Badge status={connectionStatus} variant={getStatusColor()} />
        </div>

        <div className="flex items-center gap-2">
          {/* Theme selector */}
          <Select
            value={selectedTheme}
            onChange={(value) => setSelectedTheme(value as TerminalTheme)}
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
              { value: 'solarized', label: 'Solarized Dark' },
              { value: 'solarized-light', label: 'Solarized Light' },
            ]}
            className="w-36"
          />

          {/* Font size controls */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFontSize((prev) => Math.max(8, prev - 2))}
            disabled={!isConnected}
          >
            A-
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFontSize((prev) => Math.min(32, prev + 2))}
            disabled={!isConnected}
          >
            A+
          </Button>

          {/* Search toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            disabled={!isConnected}
          >
            Search
          </Button>

          {/* Copy */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!isConnected}
          >
            Copy
          </Button>

          {/* Paste */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            disabled={!isConnected}
          >
            Paste
          </Button>

          {/* Clear */}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearScreen}
            disabled={!isConnected}
          >
            Clear
          </Button>

          {/* Interrupt */}
          <Button
            variant="ghost"
            size="sm"
            onClick={sendInterrupt}
            disabled={!isConnected}
          >
            Interrupt
          </Button>

          {/* Close */}
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
          <input
            type="text"
            className="px-3 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Search in terminal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch('next');
              } else if (e.shiftKey && e.key === 'Enter') {
                handleSearch('prev');
              }
            }}
          />
          <Button variant="ghost" size="sm" onClick={() => handleSearch('next')}>
            ↓
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleSearch('prev')}>
            ↑
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowSearch(false)}>
            ✕
          </Button>
        </div>
      )}

      {/* Terminal container */}
      <div ref={terminalRef} className="flex-1 p-2 overflow-hidden" />
    </div>
  );
}

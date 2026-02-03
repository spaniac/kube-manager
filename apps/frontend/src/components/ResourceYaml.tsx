import { useState, useMemo } from 'react';

interface SyntaxHighlightProps {
  code: string;
  language?: string;
}

interface HighlightedToken {
  type: 'key' | 'value' | 'string' | 'number' | 'comment' | 'plain';
  value: string;
}

export function ResourceYaml({ code, language = 'yaml' }: SyntaxHighlightProps) {
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const tokens = useMemo(() => {
    return highlightYaml(code);
  }, [code]);

  const lines = useMemo(() => {
    const lines: Array<{ line: number; tokens: HighlightedToken[] }> = [];
    let currentLine = 1;
    let currentTokens: HighlightedToken[] = [];

    tokens.forEach((token) => {
      const tokenLines = token.value.split('\n');
      tokenLines.forEach((line, index) => {
        if (index > 0) {
          lines.push({ line: currentLine, tokens: [...currentTokens] });
          currentLine++;
          currentTokens = [];
        }
        currentTokens.push({ type: token.type, value: line });
      });
    });

    if (currentTokens.length > 0) {
      lines.push({ line: currentLine, tokens: currentTokens });
    }

    return lines;
  }, [tokens]);

  return (
    <div className="resource-yaml">
      <div className="yaml-header">
        <span className="language-badge">{language}</span>
        <button
          className="toggle-button"
          onClick={() => setShowLineNumbers(!showLineNumbers)}
        >
          {showLineNumbers ? 'Hide' : 'Show'} Line Numbers
        </button>
      </div>
      <div className="yaml-content">
        {showLineNumbers && (
          <div className="line-numbers">
            {lines.map((line) => (
              <div key={line.line} className="line-number">
                {line.line}
              </div>
            ))}
          </div>
        )}
        <pre className="code-block">
          {lines.map((line, index) => (
            <div key={index} className="code-line">
              {line.tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={`token token-${token.type}`}>
                  {token.value}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function highlightYaml(code: string): HighlightedToken[] {
  const tokens: HighlightedToken[] = [];
  const lines = code.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Empty line
    if (trimmedLine === '') {
      tokens.push({ type: 'plain', value: line + '\n' });
      continue;
    }

    // Comment
    if (trimmedLine.startsWith('#')) {
      tokens.push({ type: 'comment', value: line + '\n' });
      continue;
    }

    // Key-value pairs
    if (trimmedLine.includes(':')) {
      const [keyPart, ...rest] = line.split(':');
      const valuePart = rest.join(':');

      // Key
      const keyIndent = keyPart.search(/\S|$/);
      const key = keyPart.trim();
      tokens.push({ type: 'plain', value: ' '.repeat(keyIndent) });
      tokens.push({ type: 'key', value: key });
      tokens.push({ type: 'plain', value: ':' });

      // Value
      const value = valuePart.trim();

      if (value === '') {
        tokens.push({ type: 'plain', value: '\n' });
        continue;
      }

      const valueIndent = valuePart.search(/\S|$/);
      const indentDiff = valueIndent - (keyPart.length + 1);

      // Check for list items
      if (trimmedLine.startsWith('- ')) {
        tokens.push({ type: 'plain', value: ' ' });
        tokens.push({ type: 'string', value: '- ' + value });
        tokens.push({ type: 'plain', value: '\n' });
        continue;
      }

      // String values
      if (value.startsWith('"') || value.startsWith("'")) {
        tokens.push({ type: 'plain', value: ' ' });
        tokens.push({ type: 'string', value: value });
        tokens.push({ type: 'plain', value: '\n' });
        continue;
      }

      // Numeric values
      if (/^-?\d+\.?\d*$/.test(value)) {
        tokens.push({ type: 'plain', value: ' ' });
        tokens.push({ type: 'number', value: value });
        tokens.push({ type: 'plain', value: '\n' });
        continue;
      }

      // Boolean values
      if (value === 'true' || value === 'false') {
        tokens.push({ type: 'plain', value: ' ' });
        tokens.push({ type: 'value', value: value });
        tokens.push({ type: 'plain', value: '\n' });
        continue;
      }

      // Null values
      if (value === 'null' || value === '~') {
        tokens.push({ type: 'plain', value: ' ' });
        tokens.push({ type: 'value', value: value });
        tokens.push({ type: 'plain', value: '\n' });
        continue;
      }

      // Regular values
      tokens.push({ type: 'plain', value: ' ' });
      tokens.push({ type: 'value', value: value });
      tokens.push({ type: 'plain', value: '\n' });
      continue;
    }

    // List items
    if (trimmedLine.startsWith('- ')) {
      tokens.push({ type: 'string', value: line + '\n' });
      continue;
    }

    // Default - treat as plain text
    tokens.push({ type: 'plain', value: line + '\n' });
  }

  return tokens;
}

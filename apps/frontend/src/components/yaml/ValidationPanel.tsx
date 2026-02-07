import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ValidationError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface ValidationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  errors: ValidationError[];
  warnings: ValidationError[];
  infos: ValidationError[];
  isValid: boolean;
}

const ValidationPanel: React.FC<ValidationPanelProps> = ({ isOpen, onClose, errors, warnings, infos, isValid }) => {
  const allMessages = [...errors, ...warnings, ...infos];

  const getIcon = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTitle = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      default:
        return '';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Message copied to clipboard!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            YAML Validation Results
          </DialogTitle>
          <DialogDescription>
            {isValid ? 'Your YAML is valid.' : 'Please review the issues below.'}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full w-full pr-4">
            {allMessages.length === 0 && isValid && (
              <Alert variant="default">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>No Issues</AlertTitle>
                <AlertDescription>Your YAML is syntactically correct and schema-valid.</AlertDescription>
              </Alert>
            )}

            {errors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-red-500 mb-2">Errors ({errors.length})</h3>
                {errors.map((msg) => (
                  <Alert key={`error-${msg.line}-${msg.column}-${msg.message}`} variant="destructive" className="mb-2 flex items-start">
                    {getIcon(msg.severity)}
                    <div className="ml-4 flex-grow">
                      <AlertTitle className="flex justify-between items-center">
                        {getTitle(msg.severity)} at Line {msg.line}, Column {msg.column}
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(msg.message)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </AlertTitle>
                      <AlertDescription>{msg.message}</AlertDescription>
                    </div>
                  </Alert>
                ))}
              </div>
            )}

            {warnings.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Warnings ({warnings.length})</h3>
                {warnings.map((msg) => (
                  <Alert key={`warning-${msg.line}-${msg.column}-${msg.message}`} variant="warning" className="mb-2 flex items-start">
                    {getIcon(msg.severity)}
                    <div className="ml-4 flex-grow">
                      <AlertTitle className="flex justify-between items-center">
                        {getTitle(msg.severity)} at Line {msg.line}, Column {msg.column}
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(msg.message)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </AlertTitle>
                      <AlertDescription>{msg.message}</AlertDescription>
                    </div>
                  </Alert>
                ))}
              </div>
            )}

            {infos.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-500 mb-2">Information ({infos.length})</h3>
                {infos.map((msg) => (
                  <Alert key={`info-${msg.line}-${msg.column}-${msg.message}`} className="mb-2 flex items-start">
                    {getIcon(msg.severity)}
                    <div className="ml-4 flex-grow">
                      <AlertTitle className="flex justify-between items-center">
                        {getTitle(msg.severity)} at Line {msg.line}, Column {msg.column}
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(msg.message)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </AlertTitle>
                      <AlertDescription>{msg.message}</AlertDescription>
                    </div>
                  </Alert>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationPanel;

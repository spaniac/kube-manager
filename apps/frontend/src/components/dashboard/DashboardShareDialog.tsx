import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';





interface DashboardShareDialogProps {
    isOpen: boolean;
    onClose: () => void;
    dashboardId: string;
    onShare: (visibility: 'PRIVATE' | 'TEAM' | 'PUBLIC', emails?: string[]) => void;
    onRevoke: () => void;
    shareLink?: string;
}

type Visibility = 'PRIVATE' | 'TEAM' | 'PUBLIC';

export const DashboardShareDialog: React.FC<DashboardShareDialogProps> = ({
    isOpen,
    onClose,
    dashboardId,
    onShare,
    onRevoke,
    shareLink,
}) => {
    const [visibility, setVisibility] = useState<Visibility>('PRIVATE');
    const [emails, setEmails] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const emailList = emails.split(',').map((e) => e.trim()).filter(Boolean);
        onShare(visibility, emailList);
        setCopied(false);
    };

    const handleCopyLink = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share Dashboard</DialogTitle>
                    <DialogDescription>
                        Configure sharing options for your dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="visibility" className="text-right">
                            Visibility
                        </label>
                        <div className="col-span-3 flex gap-2">
                            <Button
                                variant={visibility === 'PRIVATE' ? 'default' : 'outline'}
                                onClick={() => setVisibility('PRIVATE')}
                            >
                                Private
                            </Button>
                            <Button
                                variant={visibility === 'TEAM' ? 'default' : 'outline'}
                                onClick={() => setVisibility('TEAM')}
                            >
                                Team
                            </Button>
                            <Button
                                variant={visibility === 'PUBLIC' ? 'default' : 'outline'}
                                onClick={() => setVisibility('PUBLIC')}
                            >
                                Public
                            </Button>
                        </div>
                    </div>

                    {visibility === 'TEAM' && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="emails" className="text-right">
                                Emails (comma-separated)
                            </label>
                            <Input
                                id="emails"
                                value={emails}
                                onChange={(e) => setEmails(e.target.value)}
                                className="col-span-3"
                                placeholder="user1@example.com, user2@example.com"
                            />
                        </div>
                    )}



                    {shareLink && visibility === 'PUBLIC' && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="shareLink" className="text-right">
                                Share Link
                            </label>
                            <Input
                                id="shareLink"
                                value={shareLink}
                                readOnly
                                className="col-span-2"
                            />
                            <Button onClick={handleCopyLink} className="col-span-1">
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onRevoke}>
                        Revoke Share
                    </Button>
                    <Button onClick={handleShare}>
                        {shareLink ? 'Update Share' : 'Generate Share Link'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

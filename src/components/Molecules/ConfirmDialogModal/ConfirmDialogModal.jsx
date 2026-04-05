import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConfirmDialog } from '@/Hooks/Context/useConfirmDialog';

export const ConfirmDialog = () => {
  const { confirmDialogState, handleConfirm, handleCancel } =
    useConfirmDialog();

  const {
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    variant,
  } = confirmDialogState;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 cursor-pointer">
          <Button type="button" variant="outline" onClick={handleCancel} className='cursor-pointer'>
            {cancelText}
          </Button>

          <Button type="button" variant={variant} onClick={handleConfirm} className='cursor-pointer'>
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

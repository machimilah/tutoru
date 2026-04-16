import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClass: any;
  walletBalance: number;
  onConfirm: () => void;
  isLoading: boolean;
}

export function CheckoutDialog({ open, onOpenChange, selectedClass, walletBalance, onConfirm, isLoading }: CheckoutDialogProps) {
  if (!selectedClass) return null;

  const price = selectedClass.price;
  const hasEnoughFunds = walletBalance >= price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription>
            You are about to book the class <strong>{selectedClass.subject}</strong>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Class Price:</span>
            <span className="font-semibold">${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Your Wallet Balance:</span>
            <span className="font-semibold">${walletBalance.toFixed(2)}</span>
          </div>
          {!hasEnoughFunds && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
              Insufficient funds. Please add funds to your wallet before booking this class.
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {hasEnoughFunds ? (
            <Button onClick={onConfirm} disabled={isLoading} className="gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Confirm Payment
            </Button>
          ) : (
            <Button onClick={() => window.location.href = '/my-profile'}>
              Go to Wallet
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { userApi } from "@/lib/api";
import { SetStateAction } from "react";

const ConfirmLogoutDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Sign out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You will need to log in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="text-white"
              onClick={userApi.logout}
            >
              Log Out
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmLogoutDialog;

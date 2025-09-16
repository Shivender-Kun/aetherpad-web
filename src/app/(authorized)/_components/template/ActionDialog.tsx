"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
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

/** ActionDialog Props */
type Props = {
  /** Dialog title */
  title: string;
  /** Dialog description */
  description: string | React.ReactNode;
  /** Dialog action button name */
  actionName: string;
  /** Action in progress status */
  actionInProgress: boolean;
  /** Action handler */
  actionHandler: () => void;
  /** Dialog visibility status */
  open: boolean;
  /** Dialog visibility status updater */
  onOpenChange: (open: boolean) => void;
};

const ActionDialog = ({
  title,
  description,
  actionName,
  actionHandler,
  actionInProgress,
  open,
  onOpenChange,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="text-white"
              onClick={actionHandler}
              disabled={actionInProgress}
            >
              {actionInProgress ? <LoadingSpinner /> : actionName || "Yes"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionDialog;

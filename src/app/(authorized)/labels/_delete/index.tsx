"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ILabel } from "@/types";

const DeleteLabel = ({
  label,
  isLoading,
  deleteLabel,
}: {
  label: ILabel;
  isLoading: boolean;
  deleteLabel: (labelId: string) => Promise<void>;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Label: {label.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this label?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="text-white"
              onClick={(e) => {
                e.preventDefault();
                deleteLabel(label._id);
              }}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLabel;

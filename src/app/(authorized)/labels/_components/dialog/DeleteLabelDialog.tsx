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
import { ILabel } from "@/lib/types";
import { truncateString } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteLabel, optimisticDeleteLabel } from "@/store/slices/labels";
import { v4 as uuidv4 } from "uuid";

type Props = {
  label: ILabel;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

const DeleteLabel = ({ label, open, onOpenChange }: Props) => {
  const { status } = useAppSelector((state) => state.labels);
  const dispatch = useAppDispatch();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Label: {truncateString(label.name, 15)}
          </AlertDialogTitle>
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
              onClick={() => {
                const actionId = uuidv4();
                dispatch(optimisticDeleteLabel({ actionId, label }));
                dispatch(deleteLabel({ actionId, id: label._id }));
              }}
              disabled={status === "loading"}
            >
              {status === "loading" ? <LoadingSpinner /> : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLabel;

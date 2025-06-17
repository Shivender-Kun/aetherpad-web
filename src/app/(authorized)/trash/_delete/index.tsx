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
import { INote } from "@/types";

const PermanentDeleteNote = ({
  note,
  isLoading,
  deleteNote,
  open,
  onOpenChange,
}: {
  note: INote;
  isLoading: boolean;
  deleteNote: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <div
          title={"Delete Permanently"}
          className="flex items-center w-7 h-7 cursor-pointer"
        >
          <Trash2 />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Permanently: {note.title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this note permanently?
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
                deleteNote();
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

export default PermanentDeleteNote;

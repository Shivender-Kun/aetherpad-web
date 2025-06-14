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
import { Trash2 } from "lucide-react";
import { INote } from "@/types";
import { Button } from "@/components/ui/button";

const PermanentDeleteNote = ({
  note,
  deleteNote,
}: {
  note: INote;
  deleteNote: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <AlertDialog>
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
              onClick={deleteNote}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PermanentDeleteNote;

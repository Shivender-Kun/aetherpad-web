"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ILabel } from "@/lib/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import EditLabelForm from "../forms/EditLabelForm";

type Props = {
  label: ILabel;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

const EditLabel = ({ label, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <EditLabelForm label={label} setDialogOpen={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default EditLabel;

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import AddLabelButton from "../buttons/AddLabelButton";
import AddLabelForm from "../forms/AddLabelForm";

const AddLabel = () => {
  const { status } = useAppSelector((state) => state.labels);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <AddLabelButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Label</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <AddLabelForm status={status} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddLabel;

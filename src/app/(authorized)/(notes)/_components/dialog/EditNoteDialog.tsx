"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelectPopover,
  SelectableOption,
} from "@/components/ui/multi-select-popover";
import { Textarea } from "@/components/ui/textarea";
import { MAX_LABELS_PER_NOTE } from "@/constants/dataLimits";
import { notesSchema, TUpdateNoteSchemaInput } from "@/lib/schemas";
import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { optimisticNoteUpdate, updateNote } from "@/store/slices/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tags } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  compareNoteContentVersions,
  getMultiSelectOptions,
} from "../../_utils";
import PaletteButton from "../buttons/PaletteButton";
import NoteLabelsBadges from "../NoteLabelsBadges";
import PaletteOptions from "../PaletteOptions";

type Props = {
  /** Dialog visibility state */
  open: boolean;
  /** Selected note to be edited */
  selectedNote: INote;
  /** Dialog close action handler */
  closeDialog: () => void;
  /** Dialog visibility state handler */
  onOpenChange: (open: boolean) => void;
};

const EditNoteDialog = ({
  open,
  closeDialog,
  onOpenChange,
  selectedNote,
}: Props) => {
  const [bgColor, setBgColor] = useState(selectedNote.bgColor || "default");
  const [selectedLabels, setSelectedLabels] = useState<SelectableOption[]>(
    getMultiSelectOptions(selectedNote.labels),
  );
  const [showPalette, setShowPalette] = useState(false);

  const labelsList = useAppSelector((state) => state.labels.data.list);
  const { update: updateStatus } = useAppSelector(
    (state) => state.notes.actionStatus,
  );

  const dispatch = useAppDispatch();

  const labelsOptions = getMultiSelectOptions(labelsList);

  const form = useForm<TUpdateNoteSchemaInput>({
    resolver: zodResolver(notesSchema.updateInput),
    defaultValues: {
      title: selectedNote.title,
      bgColor: selectedNote.bgColor,
      content: selectedNote.content,
      labels: selectedNote.labels.map((label) => label._id),
    },
  });

  /** Note palette button click handler */
  const handlePaletteClick = () => {
    setShowPalette((prev) => !prev);
  };

  /** Note color click handler */
  const handlePaletteColorClick = (bgColor: string) => {
    setBgColor(bgColor);
  };

  const renderPaletteWithOptions = (
    <FormField
      control={form.control}
      name="bgColor"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <PaletteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePaletteClick();
                }}
              />

              <PaletteOptions
                className={`bg-card border-gray absolute top-12 w-fit max-w-screen min-w-76 justify-between border p-4 max-sm:-left-8 ${showPalette ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={(val) => {
                  handlePaletteColorClick(val);
                  field.onChange(val);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderLabelsOption = (
    <FormField
      control={form.control}
      name="labels"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MultiSelectPopover
              variant="secondary"
              title="Labels"
              placeholder="Select labels..."
              getCurrentSelectedValues={field.onChange}
              getCurrentSelectedOptions={setSelectedLabels}
              defaultValue={field.value}
              options={labelsOptions}
              maxCount={MAX_LABELS_PER_NOTE}
              className="h-10 w-10 rounded-full"
              icon={Tags}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const handleCloseDialog = (open: boolean) => {
    if (!open) setShowPalette(false);
    onOpenChange(open);
  };

  const onSubmit = async (data: TUpdateNoteSchemaInput) => {
    const contentIsUpdated = compareNoteContentVersions(selectedNote, data);
    const labelsSelected = selectedLabels.map((label) => ({
      _id: label.value,
      name: label.label,
    }));

    if (contentIsUpdated) {
      const actionId = uuidv4();
      const action = NOTE_ACTION.UPDATE;

      dispatch(
        optimisticNoteUpdate({
          actionId,
          note: selectedNote,
          noteAction: action,
          data: { ...data, labels: labelsSelected },
        }),
      );
      dispatch(updateNote({ actionId, action, id: selectedNote._id, data }));
    }

    closeDialog();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent
        className="[&>button]:hidden"
        style={{
          backgroundColor: `var(--${
            bgColor && bgColor !== "default" ? `color-${bgColor}` : "card"
          })`,
        }}
        onClick={() => setShowPalette(false)}
      >
        <DialogHeader>
          <DialogTitle className="pr-5">Edit Note</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Title"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      id="content"
                      className="h-64 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex w-full flex-col gap-4">
                <NoteLabelsBadges labels={selectedLabels} />
                <div className="flex w-full items-center">
                  <div className="flex w-full justify-between gap-4">
                    <div className="relative flex items-center gap-4">
                      {renderPaletteWithOptions}
                      {renderLabelsOption}
                    </div>
                  </div>
                  <Button type="submit" disabled={updateStatus === "loading"}>
                    {updateStatus === "loading" ? <LoadingSpinner /> : "Save"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteDialog;

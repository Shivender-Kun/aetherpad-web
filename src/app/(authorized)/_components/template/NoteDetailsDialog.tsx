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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { MAX_LABELS_PER_NOTE } from "@/constants/dataLimits";
import { noteSchema, TUpdateNoteSchema } from "@/lib/schemas";
import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { optimisticNoteUpdate, updateNote } from "@/store/slices/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tags } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import PaletteButton from "../../(notes)/_components/buttons/PaletteButton";
import PinUnpinButton from "../../(notes)/_components/buttons/PinUnpinButton";
import NoteLabelsBadges from "../../(notes)/_components/NoteLabelsBadges";
import PaletteOptions from "../../(notes)/_components/PaletteOptions";
import {
  compareNoteContentVersions,
  getMultiSelectOptions,
} from "../../(notes)/_utils";

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

const defaultNoteAttributes = (note: INote) => ({
  bgColor: note.bgColor || "default",
  isPinned: note.isPinned || false,
});

const EditNote = ({ open, closeDialog, onOpenChange, selectedNote }: Props) => {
  const [noteAttributes, setNoteAttributes] = useState(
    defaultNoteAttributes(selectedNote),
  );
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

  const form = useForm<TUpdateNoteSchema>({
    resolver: zodResolver(noteSchema.update),
    defaultValues: {
      title: selectedNote.title,
      bgColor: selectedNote.bgColor,
      content: selectedNote.content,
      labels: selectedNote.labels.map((label) => label._id),
    },
  });

  /** Note pin/unpin button click handler */
  const handlePinUnpinClick = () => {
    setNoteAttributes((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  /** Note palette button click handler */
  const handlePaletteClick = () => {
    setShowPalette((prev) => !prev);
  };

  /** Note color click handler */
  const handlePaletteColorClick = (bgColor: string) => {
    setNoteAttributes((prev) => ({ ...prev, bgColor }));
  };

  const HeaderOptions = (
    <PinUnpinButton
      isPinned={noteAttributes.isPinned}
      onClick={handlePinUnpinClick}
    />
  );

  const renderPaletteWithOptions = (
    <FormField
      control={form.control}
      name="bgColor"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover open={showPalette} onOpenChange={handlePaletteClick}>
              <PopoverTrigger>
                <PaletteButton onClick={handlePaletteClick} />
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <PaletteOptions
                  className="w-fit min-w-76 justify-between bg-transparent p-0"
                  onClick={(val) => {
                    handlePaletteColorClick(val);
                    field.onChange(val);
                  }}
                />
              </PopoverContent>
            </Popover>
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

  const onSubmit = async (data: TUpdateNoteSchema) => {
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

    const pinStatusChanged = selectedNote.isPinned !== noteAttributes.isPinned;

    if (pinStatusChanged) {
      const actionId = uuidv4();

      const action = noteAttributes.isPinned
        ? NOTE_ACTION.PIN
        : NOTE_ACTION.UNPIN;

      dispatch(
        optimisticNoteUpdate({
          actionId,
          note: { ...selectedNote, ...data, labels: labelsSelected },
          noteAction: action,
        }),
      );
      dispatch(updateNote({ actionId, action, id: selectedNote._id }));
    }

    closeDialog();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="[&>button]:hidden"
        style={{
          backgroundColor: `var(--${
            noteAttributes.bgColor && noteAttributes.bgColor !== "default"
              ? `color-${noteAttributes.bgColor}`
              : "card"
          })`,
        }}
      >
        <DialogHeader>
          <DialogTitle className="pr-5">Edit Note</DialogTitle>
          <DialogDescription></DialogDescription>

          {HeaderOptions}
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

export default EditNote;

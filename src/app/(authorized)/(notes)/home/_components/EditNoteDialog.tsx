"use client";

import Editor from "@/app/_components/editor";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelectPopover,
  SelectableOption,
} from "@/components/ui/multi-select-popover";
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
import FullscreenButton from "../../_components/buttons/FullscreenButton";
import PaletteButton from "../../_components/buttons/PaletteButton";
import NoteLabelsBadges from "../../_components/NoteLabelsBadges";
import PaletteOptions from "../../_components/PaletteOptions";
import {
  compareNoteContentVersions,
  getMultiSelectOptions,
} from "../../_utils";

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
  const [isFullScreen, setIsFullScreen] = useState(false);
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
                className={`${showPalette ? "pointer-events-auto z-50 opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={(val) => {
                  handlePaletteColorClick(val);
                  field.onChange(val);
                }}
                defaultVal={bgColor}
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
              title="Labels"
              placeholder="Select labels..."
              getCurrentSelectedValues={field.onChange}
              getCurrentSelectedOptions={setSelectedLabels}
              defaultValue={field.value}
              options={labelsOptions}
              maxCount={MAX_LABELS_PER_NOTE}
              className="h-10 w-10 rounded-full"
              icon={Tags}
              bgColor={bgColor}
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

    closeDialog();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={`[&>button]:hidden ${isFullScreen ? "fullscreen flex h-11/12 !max-h-11/12 w-11/12 !max-w-11/12 flex-col overflow-hidden" : ""} `}
        style={{ backgroundColor: `var(--color-${bgColor}` }}
        onClick={() => setShowPalette(false)}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            <FullscreenButton
              isFullScreen={isFullScreen}
              onClick={() => setIsFullScreen((prev) => !prev)}
            />
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4 overflow-hidden"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
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
                <FormItem className="flex flex-1 flex-col overflow-auto">
                  {/* <FormLabel htmlFor="content">Content</FormLabel> */}
                  <FormControl>
                    <Editor
                      initialContent={field.value}
                      onChange={field.onChange}
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
                      {renderLabelsOption}
                      {renderPaletteWithOptions}
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

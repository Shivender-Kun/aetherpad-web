"use client";

import WysiwygEditor from "@/app/_components/wysiwyg/Editor";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiSelectPopover, {
  SelectableOption,
} from "@/components/ui/multi-select-popover";
import { MAX_LABELS_PER_NOTE } from "@/constants/dataLimits";
import { noteSchema, TCreateNoteSchema } from "@/lib/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNote, optimisticNoteAdd } from "@/store/slices/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tags } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import AddNoteButton from "../../_components/buttons/AddNoteButton";
import FullscreenButton from "../../_components/buttons/FullscreenButton";
import PaletteButton from "../../_components/buttons/PaletteButton";
import NoteLabelsBadges from "../../_components/NoteLabelsBadges";
import PaletteOptions from "../../_components/PaletteOptions";
import { getMultiSelectOptions } from "../../_utils";

const AddNote = () => {
  const [selectedLabels, setSelectedLabels] = useState<SelectableOption[]>([]);
  const [showPalette, setShowPalette] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [bgColor, setBgColor] = useState("default");

  const { add: addStatus } = useAppSelector(
    (state) => state.notes.actionStatus,
  );
  const labelList = useAppSelector((state) => state.labels.data.list);
  const dispatch = useAppDispatch();

  /**  Convert labelList to the format required by MultiSelect */
  const labelsOptions = getMultiSelectOptions(labelList);

  const form = useForm<TCreateNoteSchema>({
    resolver: zodResolver(noteSchema.create),
    defaultValues: { title: "", content: "", labels: [], bgColor: "default" },
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
    setDialogOpen(open);
  };

  const onSubmit = async (data: TCreateNoteSchema) => {
    const actionId = uuidv4();

    const labels = selectedLabels.map((label) => ({
      _id: label.value,
      name: label.label,
    }));

    const payload = {
      actionId,
      labels,
      note: { _id: actionId, ...data },
    };

    try {
      dispatch(optimisticNoteAdd(payload));
      await dispatch(addNote({ actionId, ...data })).unwrap();
      form.reset();
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <AddNoteButton />
      </DialogTrigger>

      <DialogContent
        className={`[&>button]:hidden ${isFullScreen ? "fullscreen flex h-11/12 !max-h-11/12 w-11/12 !max-w-11/12 flex-col overflow-hidden" : ""} `}
        style={{ backgroundColor: `var(--color-${bgColor}` }}
        onClick={() => setShowPalette(false)}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Add Note</DialogTitle>
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
                  <FormControl>
                    <WysiwygEditor
                      initialContent={field.value}
                      onChange={field.onChange}
                      menuVisible={isFullScreen}
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
                    <div className="flex gap-4">
                      {renderLabelsOption}
                      {renderPaletteWithOptions}
                    </div>
                  </div>
                  <Button disabled={addStatus === "loading"}>
                    {addStatus === "loading" ? <LoadingSpinner /> : "Save"}
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

export default AddNote;

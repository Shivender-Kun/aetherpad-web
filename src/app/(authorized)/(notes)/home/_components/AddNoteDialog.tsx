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
  DialogTrigger,
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
import MultiSelectPopover, {
  SelectableOption,
} from "@/components/ui/multi-select-popover";
import { Textarea } from "@/components/ui/textarea";
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
import PaletteButton from "../../_components/buttons/PaletteButton";
import NoteLabelsBadges from "../../_components/NoteLabelsBadges";
import PaletteOptions from "../../_components/PaletteOptions";
import { getMultiSelectOptions } from "../../_utils";

const AddNote = () => {
  const [selectedLabels, setSelectedLabels] = useState<SelectableOption[]>([]);
  const [showPalette, setShowPalette] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
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
              title="Labels"
              placeholder="Select labels..."
              getCurrentSelectedValues={field.onChange}
              getCurrentSelectedOptions={setSelectedLabels}
              defaultValue={field.value}
              options={labelsOptions}
              maxCount={MAX_LABELS_PER_NOTE}
              className="h-10 w-10 rounded-full"
              icon={Tags}
              variant="secondary"
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
        className="[&>button]:hidden"
        style={{
          backgroundColor: `var(--${
            bgColor !== "default" ? `color-${bgColor}` : "card"
          })`,
        }}
        onClick={() => setShowPalette(false)}
      >
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
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
                    <Input id="title" {...field} autoComplete="off" />
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
                    <Textarea id="content" {...field} className="h-64" />
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
                      {renderPaletteWithOptions}
                      {renderLabelsOption}
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

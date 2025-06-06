"use client";

import {
  Dialog,
  DialogContent,
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
import { updateNoteSchema } from "@/validations/notes.validation";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import noteAction from "@/lib/api/noteAction";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { INote } from "@/types";
import z from "zod";
import { useEffect, useState } from "react";
import { PALETTE_OPTIONS } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Palette, Pin, PinOff, Tags } from "lucide-react";

const EditNote = ({
  selectedNote,
  closeDialog,
  open,
  onOpenChange,
}: {
  selectedNote: INote;
  closeDialog: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { labels, setAPIMessage } = useStore();
  const [noteAttributes, setNoteAttributes] = useState(() => ({
    bgColor: selectedNote.bgColor || "",
    isPinned: selectedNote.isPinned || false,
  }));

  // Convert labelList to the format required by MultiSelect
  const labelsOptions = labels.list.map((label) => ({
    value: label._id,
    label: label.name,
  }));

  const form = useForm<z.infer<typeof updateNoteSchema>>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      title: selectedNote.title,
      content: selectedNote.content,
      labels: selectedNote.labels.map((label) => label._id),
    },
  });

  useEffect(() => {
    if (selectedNote) {
      form.reset({
        title: selectedNote.title,
        content: selectedNote.content,
        labels: selectedNote.labels.map((label) => label._id),
      });
    }
  }, [selectedNote, form]);

  const HeaderOptions = (
    <Popover>
      <PopoverTrigger
        className="absolute top-4 right-4 rounded-full w-7 h-7 cursor-pointer"
        title="Pin"
        onClick={(e) => {
          e.stopPropagation();
          setNoteAttributes((prev) => ({ ...prev, isPinned: !prev.isPinned }));
        }}
      >
        {noteAttributes.isPinned ? <PinOff /> : <Pin />}
      </PopoverTrigger>
    </Popover>
  );

  const renderPaletteOption = (
    <Popover>
      <PopoverTrigger
        title="Card Color"
        className="rounded-full w-7 h-7 cursor-pointer "
      >
        <Palette />
      </PopoverTrigger>
      <PopoverContent
        className="w-full"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          const role = target.role;
          if (role === "button") {
            const bgColor = target.dataset.bgColor;
            console.log("Background Color:", bgColor);

            if (bgColor) setNoteAttributes((prev) => ({ ...prev, bgColor }));
          }
        }}
      >
        <div className="flex gap-4">
          {PALETTE_OPTIONS.map((color) => (
            <div
              key={color}
              role="button"
              data-bg-color={color}
              aria-label={color}
              className={`w-4 h-4 rounded-full cursor-pointer border`}
              style={{ backgroundColor: `var(--color-${color})` }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  const renderLabelsOption = (
    <Popover>
      <PopoverTrigger
        title="Labels"
        className="rounded-full w-7 h-7 cursor-pointer "
      >
        <Tags />
      </PopoverTrigger>
      <PopoverContent className="w-full" onClick={() => {}}>
        <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="labels" className="max-w-fit">
                Labels
              </FormLabel>
              <FormControl>
                <MultiSelect
                  id="labels"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  options={labelsOptions}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  );

  const onSubmit = async (data: z.infer<typeof updateNoteSchema>) => {
    noteAction({
      id: selectedNote._id,
      action: "UPDATE",
      data: { ...data, ...noteAttributes },
      showToast: setAPIMessage,
    });

    closeDialog();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="[&>button]:hidden"
        style={{
          backgroundColor: `var(--${
            noteAttributes.bgColor ? `color-${noteAttributes.bgColor}` : "card"
          })`,
        }}
      >
        <DialogHeader>
          <DialogTitle className="pr-5">Edit Note</DialogTitle>
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
                    <Input id="title" placeholder="Title" {...field} />
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
              <div className="flex gap-4 justify-between w-full">
                <div className="flex gap-4">
                  {renderPaletteOption}
                  {renderLabelsOption}
                </div>
              </div>
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNote;

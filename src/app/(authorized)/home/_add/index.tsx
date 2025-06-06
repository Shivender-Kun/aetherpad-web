"use client";

import {
  Dialog,
  DialogContent,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createNoteSchema } from "@/validations/notes.validation";
import { Palette, Pin, PinOff, Plus, Tags } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PALETTE_OPTIONS } from "@/constants";
import noteAction from "@/lib/api/noteAction";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { useState } from "react";
import z from "zod";

const AddNote = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noteAttributes, setNoteAttributes] = useState({
    bgColor: "",
    isPinned: false,
  });

  const {
    labels: { list: labelList },
    setAPIMessage,
  } = useStore();

  // Convert labelList to the format required by MultiSelect
  const labelsOptions = labelList.map((label) => ({
    value: label._id,
    label: label.name,
  }));

  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: "", content: "", labels: [] },
  });

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

  const onSubmit = async (data: z.infer<typeof createNoteSchema>) => {
    noteAction({
      action: "ADD",
      data: { ...data, ...noteAttributes },
      showToast: setAPIMessage,
    });
    setDialogOpen(false);
    form.reset();
    setNoteAttributes({ bgColor: "", isPinned: false });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="[&>button]:hidden"
        style={{
          backgroundColor: `var(--${
            noteAttributes.bgColor ? `color-${noteAttributes.bgColor}` : "card"
          })`,
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
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
                    <Input id="title" {...field} />
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

export default AddNote;

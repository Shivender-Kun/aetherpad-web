"use client";

import {
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

const EditNote = ({
  selectedNote,
  closeDialog,
}: {
  selectedNote: INote;
  closeDialog: () => void;
}) => {
  const { labels, setAPIMessage } = useStore();

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

  const onSubmit = async (data: z.infer<typeof updateNoteSchema>) => {
    console.log(data);

    // noteAction({
    //   id: selectedNote._id,
    //   action: "UPDATE",
    //   data,
    //   showToast: setAPIMessage,
    // });
    // closeDialog();
    // form.reset();
  };

  return (
    <DialogContent
      style={{
        backgroundColor: `var(--${
          selectedNote.bgColor ? `color-${selectedNote.bgColor}` : "card"
        })`,
      }}
    >
      <DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogTitle className="pr-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="title"
                        {...field}
                        placeholder="Title"
                        className="bg-inherit dark:bg-inherit border-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogTitle>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="content"
                      {...field}
                      className="h-64 resize-none bg-inherit dark:bg-inherit border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="labels"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelect
                      id="labels"
                      onValueChange={field.onChange}
                      options={labelsOptions}
                      placeholder="Labels"
                      className="bg-inherit dark:bg-inherit border-0"
                      defaultValue={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};

export default EditNote;

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
import { createNoteSchema } from "@/validations/notes.validation";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import noteAction from "@/lib/api/noteAction";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useStore } from "@/store";
import { useState } from "react";
import z from "zod";

const AddNote = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const onSubmit = async (data: z.infer<typeof createNoteSchema>) => {
    noteAction({ action: "ADD", data, showToast: setAPIMessage });
    setDialogOpen(false);
    form.reset();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
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
                      options={labelsOptions}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;

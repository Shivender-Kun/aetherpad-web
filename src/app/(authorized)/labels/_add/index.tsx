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
import { createLabelSchema } from "@/validations/labels.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import labelAction from "@/lib/api/labelAction";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useStore } from "@/store";
import { useState } from "react";
import z from "zod";

const AddLabel = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setAPIMessage } = useStore();

  const form = useForm<z.infer<typeof createLabelSchema>>({
    resolver: zodResolver(createLabelSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: z.infer<typeof createLabelSchema>) => {
    labelAction({ action: "ADD", data, showToast: setAPIMessage });
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
          <DialogTitle>Add Label</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Label Name</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLabel;

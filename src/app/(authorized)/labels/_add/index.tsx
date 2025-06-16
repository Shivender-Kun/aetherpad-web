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
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import labelAction from "@/lib/api/labelAction";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useStore } from "@/store";
import { useState } from "react";
import z from "zod";

const AddLabel = () => {
  const { setAPIMessage, setIsLoading, isLoading } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createLabelSchema>>({
    resolver: zodResolver(createLabelSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: z.infer<typeof createLabelSchema>) => {
    await labelAction({ action: "ADD", data, setIsLoading, setAPIMessage });
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
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLabel;

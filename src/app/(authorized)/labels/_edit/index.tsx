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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditIcon } from "lucide-react";
import { ILabel } from "@/types";
import z from "zod";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Label name is required")
    .max(30, "Label name can not be longer than 30 characters."),
});

const EditLabel = ({
  label,
  isLoading,
  updateLabel,
}: {
  label: ILabel;
  isLoading: boolean;
  updateLabel: (labelId: string, data: { name: string }) => Promise<any>;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: label.name },
  });

  useEffect(() => {
    if (label) form.reset({ name: label.name });
  }, [label, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await updateLabel(label._id, data);

    if (response.status === 200) {
      setDialogOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
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
                {isLoading ? <LoadingSpinner /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLabel;

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { labelSchema, TCreateLabelSchema } from "@/lib/schemas";
import { useAppDispatch } from "@/store/hooks";
import { addLabel, optimisticAddLabel } from "@/store/slices/labels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const AddLabelForm = ({
  status,
  setDialogOpen,
}: {
  status: "idle" | "loading" | "succeeded" | "failed";
  setDialogOpen: (open: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<TCreateLabelSchema>({
    resolver: zodResolver(labelSchema.create),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: TCreateLabelSchema) => {
    const actionId = uuidv4();
    const payload = { ...data, actionId };

    dispatch(optimisticAddLabel(payload));
    dispatch(addLabel(payload));
    form.reset();
    setDialogOpen(false);
  };

  return (
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
                <Input id="name" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button disabled={status === "loading"}>
            {status === "loading" ? <LoadingSpinner /> : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddLabelForm;

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
import { labelsSchema, TUpdateLabelSchema } from "@/lib/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { optimisticUpdateLabel, updateLabel } from "@/store/slices/labels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type Props = {
  label: { _id: string; name: string };
  setDialogOpen: (open: boolean) => void;
};

const EditLabelForm = ({ label, setDialogOpen }: Props) => {
  const { status } = useAppSelector((state) => state.labels);
  const dispatch = useAppDispatch();

  const form = useForm<TUpdateLabelSchema>({
    resolver: zodResolver(labelsSchema.update),
    defaultValues: { name: label.name },
  });

  const onSubmit = async (data: TUpdateLabelSchema) => {
    const actionId = uuidv4();

    dispatch(
      optimisticUpdateLabel({ actionId, label, updatedName: data.name }),
    );
    dispatch(updateLabel({ label: { ...data, _id: label._id }, actionId }));

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
            {status === "loading" ? <LoadingSpinner /> : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditLabelForm;

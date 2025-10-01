"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userApi } from "@/lib/api";
import { TResetPasswordFormSchema, userSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ResetPasswordSuccessDialog from "./ResetPasswordSuccessDialog";

const ResetPasswordForm = () => {
  const [hiddenFields, setHiddenFields] = useState({
    newPassword: true,
    confirmPassword: true,
  });
  const [showResetSuccessDialog, setShowResetSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<TResetPasswordFormSchema>({
    resolver: zodResolver(userSchema.resetPassword),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      token: searchParams.get("token")!,
    },
  });

  const onSubmit = async (data: TResetPasswordFormSchema) => {
    const parsedData = userSchema.resetPasswordTransformed.parse(data);
    const response = await userApi.resetPassword({
      data: parsedData,
      setIsLoading,
    });
    if (response?.status === 200) {
      setShowResetSuccessDialog(true);
      form.reset();
    }
  };

  const renderShowPassword = (fieldName: "newPassword" | "confirmPassword") => {
    const fieldHidden = hiddenFields[fieldName];

    const handleClick = () =>
      setHiddenFields((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));

    return (
      <div className="p-1" onClick={handleClick}>
        {fieldHidden ? <Eye /> : <EyeOff />}
      </div>
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-center text-sm text-gray-500"> </p>

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="newPassword"
                  className="flex flex-col items-start gap-4"
                >
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="bg-input dark:bg-input/30 flex items-center gap-2 rounded-md border-2">
                    <Input
                      id={field.name}
                      placeholder="*******"
                      type={hiddenFields[field.name] ? "password" : "text"}
                      className="focus-visible:ring-ring/0 border-0 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] active:border-0 dark:bg-transparent dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
                      {...field}
                    />
                    {renderShowPassword(field.name)}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="confirmPassword"
                  className="flex flex-col items-start gap-4"
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="bg-input dark:bg-input/30 flex items-center gap-2 rounded-md border-2">
                    <Input
                      id={field.name}
                      placeholder="*******"
                      type={hiddenFields[field.name] ? "password" : "text"}
                      className="focus-visible:ring-ring/0 border-0 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] active:border-0 dark:bg-transparent dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
                      {...field}
                    />
                    {renderShowPassword(field.name)}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input hidden {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Reset"}
          </Button>
        </form>
      </Form>

      <ResetPasswordSuccessDialog
        open={showResetSuccessDialog}
        onOpenChange={setShowResetSuccessDialog}
      />
    </>
  );
};

export default ResetPasswordForm;

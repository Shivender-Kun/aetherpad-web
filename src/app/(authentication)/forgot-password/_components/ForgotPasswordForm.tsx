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
import { TForgotPasswordSchema, userSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ResetEmailSentDialog from "./ResetEmailSentDialog";

const ForgotPasswordForm = () => {
  const [emailSentDialog, setEmailSentDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(userSchema.forgotPassword),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: TForgotPasswordSchema) => {
    const response = await userApi.forgotPassword({
      email: data.email,
      setIsLoading,
    });

    if (response?.status === 200) {
      setEmailSentDialog(true);
      form.reset();
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-center text-sm text-gray-500">
            Send a password reset link to your registered email
          </p>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="flex flex-col items-start gap-4"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="example@abc.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Forgot Password"}
          </Button>
        </form>
      </Form>

      <ResetEmailSentDialog
        open={emailSentDialog}
        onOpenChange={setEmailSentDialog}
      />
    </>
  );
};

export default ForgotPasswordForm;

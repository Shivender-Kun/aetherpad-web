"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ResetEmailSentDialog from "@/components/dialog/resetEmailSent";
import { forgotPasswordSchema } from "@/validations/user.validation";
import forgotPassword from "@/lib/api/users/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import Link from "next/link";
import { z } from "zod";

const ForgotPasswordForm = () => {
  const [emailSentDialog, setEmailSentDialog] = useState(false);
  const { setIsLoading, setAPIMessage, apiMessage, isLoading } = useStore();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    await forgotPassword({ email: data.email, setIsLoading, setAPIMessage });
  };

  useEffect(() => {
    if (apiMessage?.type === "success") {
      setEmailSentDialog(true);
      form.reset();
    }
  }, [apiMessage]);

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md max-w-md mx-auto md:min-w-md">
      <h2 className="text-xl font-medium">Forgot Password</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-sm text-center text-gray-500">
            Send a password reset link to your registered email
          </p>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="flex flex-col gap-4 items-start"
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

          <Button disabled={isLoading}>Forgot Password</Button>
        </form>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-center text-gray-500 mt-4">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-sm text-center text-gray-500">
            {`Don't`} have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Form>

      <ResetEmailSentDialog
        open={emailSentDialog}
        onOpenChange={setEmailSentDialog}
      />
    </div>
  );
};

export default ForgotPasswordForm;

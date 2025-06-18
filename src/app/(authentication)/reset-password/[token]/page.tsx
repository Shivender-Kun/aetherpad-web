"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ResetPasswordSuccessDialog from "@/components/dialog/resetPasswordSuccess";
import { resetPasswordSchema } from "@/validations/user.validation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import resetPassword from "@/lib/api/users/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import Link from "next/link";
import z from "zod";

const ResetPassword = () => {
  const [hiddenFields, setHiddenFields] = useState({
    newPassword: true,
    confirmPassword: true,
  });
  const [showResetSuccessDialog, setShowResetSuccessDialog] = useState(false);
  const { setIsLoading, setAPIMessage, apiMessage, isLoading } = useStore();
  const params = useParams();
  const resetToken = params.token;

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: resetToken as string,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    await resetPassword({
      newPassword: data.newPassword,
      token: resetToken as string,
      setIsLoading,
      setAPIMessage,
    });
  };

  useEffect(() => {
    if (apiMessage?.type === "success") {
      setShowResetSuccessDialog(true);
      form.reset();
    }
  }, [apiMessage]);

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
    <div className="flex flex-col gap-8 justify-center items-center p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md max-w-md mx-auto md:min-w-md">
      <h2 className="text-xl font-medium">Reset Password</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-sm text-center text-gray-500"> </p>

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input hidden {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="newPassword"
                  className="flex flex-col gap-4 items-start"
                >
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center border-2 rounded-md bg-input dark:bg-input/30">
                    <Input
                      id={field.name}
                      placeholder="*******"
                      type={hiddenFields[field.name] ? "password" : "text"}
                      className="border-0 focus-visible:ring-ring/0 active:border-0 bg-transparent dark:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
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
                  className="flex flex-col gap-4 items-start"
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center border-2 rounded-md bg-input dark:bg-input/30">
                    <Input
                      id={field.name}
                      placeholder="*******"
                      type={hiddenFields[field.name] ? "password" : "text"}
                      className="border-0 focus-visible:ring-ring/0 active:border-0 bg-transparent dark:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
                      {...field}
                    />
                    {renderShowPassword(field.name)}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Reset"}
          </Button>
        </form>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-center text-gray-500 mt-4">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </Form>

      <ResetPasswordSuccessDialog
        open={showResetSuccessDialog}
        onOpenChange={setShowResetSuccessDialog}
      />
    </div>
  );
};

export default ResetPassword;

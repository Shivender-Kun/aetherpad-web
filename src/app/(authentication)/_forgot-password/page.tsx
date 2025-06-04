"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema } from "@/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md max-w-md mx-auto md:min-w-md">
      <h2 className="text-xl font-medium">Forgot Password</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-sm text-center text-gray-500">
            Send a reset link to your email
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
                  <Input placeholder="example@abc.com" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Forgot Password</Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

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
import { TUserLoginSchema, userSchema } from "@/lib/schemas";
import { useAppDispatch } from "@/store/hooks";
import { setNotification } from "@/store/slices/notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<TUserLoginSchema>({
    resolver: zodResolver(userSchema.login),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const renderShowPassword = () => {
    const handleClick = () => setHidePassword((prev) => !prev);

    return (
      <div className="p-1" onClick={handleClick}>
        {hidePassword ? <Eye /> : <EyeOff />}
      </div>
    );
  };

  const onSubmit = async (data: TUserLoginSchema) => {
    const response = await userApi.signin({ data, setIsLoading });
    if (response) {
      const { error, code } = response;
      if (error) {
        const myError = JSON.parse(code || "{}");
        dispatch(
          setNotification({
            type: "error",
            message:
              myError.message || "Something went wrong. Please try again.",
          }),
        );
      } else router.replace("/home");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-center text-sm text-gray-500">
          Welcome back! Please enter your details.
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
                <div className="bg-input dark:bg-input/30 flex items-center gap-2 rounded-md border-2">
                  <Input
                    id={field.name}
                    className="focus-visible:ring-ring/0 border-0 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] active:border-0 dark:bg-transparent dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
                    placeholder="example@abc.com"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="password"
                className="flex flex-col items-start gap-4"
              >
                Password
              </FormLabel>
              <FormControl>
                <div className="bg-input dark:bg-input/30 flex items-center gap-2 rounded-md border-2">
                  <Input
                    id={field.name}
                    placeholder="*******"
                    type={hidePassword ? "password" : "text"}
                    className="focus-visible:ring-ring/0 border-0 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] active:border-0 dark:bg-transparent dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
                    {...field}
                  />
                  {renderShowPassword()}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Sign in"}
        </Button>

        <Link href="forgot-password" className="text-right">
          Forgot Password?
        </Link>
      </form>
    </Form>
  );
};

export default SigninForm;

"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { loginSchema } from "@/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import userLogin from "@/lib/api/users/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import Link from "next/link";
import { z } from "zod";

const LoginForm = () => {
  const { setIsLoading, setAPIMessage, apiMessage, isLoading } = useStore();
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
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

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    userLogin({ data, setAPIMessage, setIsLoading });
  };

  useEffect(() => {
    if (apiMessage?.type === "success") router.replace("/home");
  }, [apiMessage, router]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-6 rounded-2xl bg-black/50 backdrop-blur-md border border-gray-700 shadow-xl w-full h-fit max-w-md mx-auto">
      <h2 className="text-xl font-medium">Login</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-sm text-center text-gray-500">
            Welcome back! Please enter your details.
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
                  <div className="flex gap-2 items-center border-2 rounded-md bg-input dark:bg-input/30">
                    <Input
                      id={field.name}
                      className="border-0 focus-visible:ring-ring/0 active:border-0 bg-transparent dark:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
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
                  className="flex flex-col gap-4 items-start"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center border-2 rounded-md bg-input dark:bg-input/30">
                    <Input
                      id={field.name}
                      placeholder="*******"
                      type={hidePassword ? "password" : "text"}
                      className="border-0 focus-visible:ring-ring/0 active:border-0 bg-transparent dark:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(229,229,229)] dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(40,50,66)]"
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
            {isLoading ? <LoadingSpinner /> : "Login"}
          </Button>

          <Link href="forgot-password" className="text-right">
            Forgot Password?
          </Link>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-500">
        {"By signing in, you agree to our "}
        <Link href="/terms" className="text-blue-600 hover:text-blue-500">
          Terms of Use
        </Link>
        {" and "}
        <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-sm text-gray-500">
        {"Don't have an account? "}
        <Link href="register" className="text-blue-600 hover:text-blue-500">
          {"Sign up "}
        </Link>
        now.
      </p>
    </div>
  );
};

export default LoginForm;

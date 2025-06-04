"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import userLogin from "@/lib/api/users/login";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { useEffect } from "react";
import Link from "next/link";
import { z } from "zod";

export const LoginForm = () => {
  const { setIsLoading, setAPIMessage, apiMessage } = useStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    userLogin({ data, setAPIMessage, setIsLoading });
  };

  useEffect(() => {
    if (apiMessage?.type === "success") router.replace("/home");
  }, [apiMessage, router]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md w-full max-w-md mx-auto">
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
                  <Input
                    placeholder="example@abc.com"
                    {...field}
                    autoComplete="email"
                  ></Input>
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
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Login</Button>

          {/* <Link href="forgot-password" className="text-right">
            Forgot Password?
          </Link> */}
        </form>
      </Form>

      <p className="text-center text-sm text-gray-500">
        {"By signing in, you agree to our "}
        <Link href="/terms" className="text-blue-600 hover:text-blue-500">
          Terms of Service
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

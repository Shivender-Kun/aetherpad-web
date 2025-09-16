"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { TRegisterUserSchema, userSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const [hiddenFields, setHiddenFields] = useState({
    password: true,
    confirmPassword: true,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const form = useForm<TRegisterUserSchema>({
    resolver: zodResolver(userSchema.register),
    defaultValues: {
      email: "",
      password: "",
      profilePicture: "",
    },
  });

  const renderShowPassword = (fieldName: "password" | "confirmPassword") => {
    const fieldHidden = hiddenFields[fieldName];

    const handleClick = () =>
      setHiddenFields((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));

    return (
      <div className="p-1" onClick={handleClick}>
        {fieldHidden ? <Eye /> : <EyeOff />}
      </div>
    );
  };

  const onSubmit = async (data: TRegisterUserSchema) => {
    const response = await userApi.signup({ data, setIsLoading });
    if (response?.status === 201) router.push("/signin");
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileSelected = e.target.files && e.target.files[0];
    if (fileSelected) {
      const imageUrl = window.URL.createObjectURL(fileSelected);
      setImageUrl(imageUrl);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-center text-sm text-gray-500">
          Create an account to get started.
        </p>

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel
                htmlFor="profilePicture"
                className="relative flex cursor-pointer flex-col items-center gap-2"
              >
                <Avatar className="mx-auto h-20 w-20">
                  {imageUrl && <AvatarImage src={imageUrl} />}
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                Profile Picture
              </FormLabel>
              <FormControl>
                <input
                  type="file"
                  id={field.name}
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      handleImageSelection(e);
                    }
                  }}
                  className="absolute h-[0px] w-[0px]"
                  ref={imageInputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;

"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { registerUserSchema } from "@/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import userRegister from "@/lib/api/users/register";
import { Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { compressImage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import Link from "next/link";
import { z } from "zod";

const RegisterForm = () => {
  const [hiddenFields, setHiddenFields] = useState({
    password: true,
    confirmPassword: true,
  });
  const { isLoading, setIsLoading, setAPIMessage, apiMessage } = useStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
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

  const onSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    userRegister({
      data,
      setAPIMessage,
      setIsLoading,
      imageRef: imageInputRef,
    });
  };

  useEffect(() => {
    if (apiMessage?.type === "success") router.replace("/login");
  }, [apiMessage, router]);

  const handleImageSelection = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileSelected = e.target.files && e.target.files[0];

    if (fileSelected) {
      // Compress the image before uploading to S3. This is optional, but it can help save storage space.
      const compressedImage = await compressImage(fileSelected, {
        quality: 0.8,
        type: fileSelected.type,
      });

      const imageUrl = window.URL.createObjectURL(compressedImage);
      setImageUrl(imageUrl);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(compressedImage);
      e.target.files = dataTransfer.files;
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md w-full h-fit max-w-md mx-auto">
      <h2 className="text-xl font-medium">Signup</h2>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 w-full "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-sm text-center text-gray-500">
            Create an account to get started.
          </p>

          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel
                  htmlFor="profilePicture"
                  className="relative cursor-pointer flex flex-col items-center gap-2"
                  onClick={() => {
                    if (imageInputRef.current) imageInputRef.current.click();
                  }}
                >
                  <Avatar className="w-20 h-20 mx-auto">
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
                    onChangeCapture={handleImageSelection}
                    className="w-[0px] h-[0px] absolute"
                    {...field}
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

          <Button>{isLoading ? "Signing up" : "Signup"}</Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-500">
        {"By signing in, you agree to our "}
        <Link
          href="/terms-&-conditions"
          className="text-blue-600 hover:text-blue-500"
        >
          Terms of Service
        </Link>
        {" and "}
        <Link
          href="/privacy-policy"
          className="text-blue-600 hover:text-blue-500"
        >
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-sm text-gray-500">
        {"Already have an account? "}
        <Link
          href="login"
          className="text-center text-blue-600 hover:text-blue-500"
        >
          {"Login "}
        </Link>
        now.
      </p>
    </div>
  );
};

export default RegisterForm;

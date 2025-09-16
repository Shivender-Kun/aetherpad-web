import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TUpdateUserSchema, userSchema } from "@/lib/schemas";
import { IUserDetails } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/slices/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EditProfile = ({ user }: { user: IUserDetails }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(
    () => user.profilePicture || "",
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    () => user.coverPicture || "",
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const { status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const form = useForm<TUpdateUserSchema>({
    resolver: zodResolver(userSchema.update),
    defaultValues: {
      username: user.username,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
    },
  });

  const handleImageSelection = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover",
  ) => {
    const fileSelected = e.target.files && e.target.files[0];
    if (fileSelected) {
      const imageUrl = window.URL.createObjectURL(fileSelected);
      if (type === "profile") setProfileImageUrl(imageUrl);
      else setCoverImageUrl(imageUrl);
    }
  };

  const onSubmit = async (data: TUpdateUserSchema) => {
    const parsedData = userSchema.updateParsed.parse(data);

    try {
      await dispatch(updateUser(parsedData));
    } catch (error) {
      // console.error(error);
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="absolute right-4 bottom-4 rounded-md bg-slate-300 p-2 dark:bg-gray-900/70">
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="form relative min-h-96">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="coverPicture"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel
                      htmlFor="coverPicture"
                      className="relative z-20 flex cursor-pointer flex-col items-center gap-2"
                    >
                      <div className="relative h-30 w-full overflow-hidden rounded-md border-2">
                        <div className="absolute top-0 left-0 z-10 flex h-full w-full justify-end bg-slate-300/40 p-1 dark:bg-gray-800/60">
                          <FormMessage />
                        </div>
                        <Image
                          src={coverImageUrl}
                          alt="Cover Image"
                          width={458}
                          height={120}
                        />
                      </div>
                    </FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        id={field.name}
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file); // ✅ manually call field.onChange with File
                            handleImageSelection(e, "cover"); // ✅ your custom preview handler
                          }
                        }}
                        className="absolute h-[0px] w-[0px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="absolute top-20 left-0 flex w-full flex-col gap-4">
                <FormField
                  name="profilePicture"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel
                        htmlFor="profilePicture"
                        className="relative z-20 flex cursor-pointer flex-col items-center gap-2"
                      >
                        <Avatar className="mx-auto h-20 w-20 border-2 border-white/50">
                          <AvatarImage src={profileImageUrl} />
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
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file); // ✅ manually call field.onChange with File
                              handleImageSelection(e, "profile"); // ✅ your custom preview handler
                            }
                          }}
                          className="absolute h-[0px] w-[0px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />{" "}
                <DialogFooter>
                  <Button disabled={status === "loading"}>
                    {status === "loading" ? <LoadingSpinner /> : "Update"}
                  </Button>
                </DialogFooter>{" "}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;

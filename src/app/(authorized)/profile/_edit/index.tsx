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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserSchema } from "@/validations/user.validation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import updateProfile from "@/lib/api/users/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, ImageUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compressImage } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useStore } from "@/store";
import { IUser } from "@/types";
import Image from "next/image";
import { z } from "zod";

const EditProfile = ({ user }: { user: IUser }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(
    () => user.profilePicture || ""
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    () => user.coverPicture || ""
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const coverPictureRef = useRef<HTMLInputElement>(null);

  const { setAPIMessage, setIsLoading, isLoading } = useStore();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      username: user.username || "",
      profilePicture: user.profilePicture || undefined,
    },
  });

  const handleImageSelection = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const fileSelected = e.target.files && e.target.files[0];

    if (fileSelected) {
      // Compress the image before uploading to S3. This is optional, but it can help save storage space.
      const compressedImage = await compressImage(
        fileSelected,
        {
          quality: 0.8,
          type: fileSelected.type,
        },
        type === "profile"
      );

      const profileImageUrl = window.URL.createObjectURL(compressedImage);
      if (type === "profile") setProfileImageUrl(profileImageUrl);
      else setCoverImageUrl(profileImageUrl);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(compressedImage);
      e.target.files = dataTransfer.files;
    }
  };

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    const payload = { ...data, profilePicture: "" };

    await updateProfile({
      data: payload,
      coverPictureRef,
      profilePictureRef,
      setAPIMessage,
      setIsLoading,
    });

    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="absolute bottom-4 right-4 p-2 bg-slate-300 dark:bg-gray-900/70 rounded-md">
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="form relative min-h-96">
          <div className="w-full h-30 overflow-hidden border-2 rounded-md relative">
            <Image
              src={coverImageUrl}
              alt="Cover Image"
              width={458}
              height={120}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-slate-300/40 dark:bg-gray-800/60 flex items-end justify-end p-1 z-10">
              <Label
                htmlFor="cover-image-input"
                className="bg-slate-300/40 dark:bg-gray-800/60 rounded-md p-1 cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="cover-image-input"
                  ref={coverPictureRef}
                  className="w-[0px] h-[0px] absolute"
                  onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleImageSelection(e, "cover")
                  }
                />
                <ImageUp size={40} strokeWidth="1px" />
              </Label>
            </div>
          </div>

          <Form {...form}>
            <form
              className="absolute w-full top-20 flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="profilePicture"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel
                      htmlFor="profilePicture"
                      className="relative cursor-pointer flex flex-col items-center gap-2 z-20"
                    >
                      <Avatar className="w-20 h-20 mx-auto border-2 border-white/50">
                        {profileImageUrl && (
                          <AvatarImage src={profileImageUrl} />
                        )}
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
                        onChangeCapture={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleImageSelection(e, "profile")}
                        className="w-[0px] h-[0px] absolute"
                        ref={profilePictureRef}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled />
                      </FormControl>
                    </FormItem>
                  );
                }}
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
              />

              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;

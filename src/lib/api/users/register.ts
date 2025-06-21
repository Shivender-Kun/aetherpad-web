import uploadImage, { deleteImage } from "@/services/firebaseStorage";
import errorHandler from "@/lib/errorHandler";
import { StoreContextType } from "@/types";
import { RefObject } from "react";
import { API } from "@/constants";
import axios from "axios";

type UserRegisterProps = {
  data: { email: string; password: string };
  setIsLoading: (isLoading: boolean) => void;
  imageRef: RefObject<HTMLInputElement | null>;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const userRegister = async ({
  data,
  imageRef,
  setIsLoading,
  setAPIMessage,
}: UserRegisterProps) =>
  await errorHandler({
    apiCall: async () => {
      if (imageRef.current?.files) {
        const profilePicture = imageRef.current.files[0];
        try {
          const profilePictureURL = await uploadImage(
            profilePicture,
            data.email,
            "profile-picture"
          );
          const requestData = {
            ...data,
            profilePicture: profilePictureURL,
            confirmPassword: undefined,
          };
          delete requestData.confirmPassword;

          const response = await axios.post(API.USER.REGISTER, requestData);

          if (response.status === 201) {
            setAPIMessage({
              notify: true,
              type: "success",
              message: response.data.message,
            });

            window.location.href = "/login";
          } else {
            await deleteImage(data.email, "profile-picture");
          }
        } catch (error) {
          await deleteImage(data.email, "profile-picture");
          throw error;
        }
      }
    },
    setIsLoading,
    setAPIMessage,
  });

export default userRegister;

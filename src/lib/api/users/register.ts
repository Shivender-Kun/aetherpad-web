import uploadImage, { deleteImage } from "@/services/firebaseStorage";
import errorHandler from "@/lib/errorHandler";
import { StoreContextType } from "@/types";
import { API } from "@/constants";
import { RefObject } from "react";
import axios from "axios";

type UserRegisterProps = {
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  data: { email: string; password: string };
  imageRef: RefObject<HTMLInputElement | null>;
};

const userRegister = async ({
  setAPIMessage,
  setIsLoading,
  data,
  imageRef,
}: UserRegisterProps) => {
  setAPIMessage(null);
  setIsLoading(true);
  if (imageRef.current?.files) {
    const profilePicture = imageRef.current.files[0];
    try {
      const profilePictureURL = await uploadImage(
        profilePicture,
        data.email + "profile-picture",
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
        deleteImage(data.email + "profile-picture", "profile-picture");
      }
    } catch (error) {
      errorHandler(error, setAPIMessage);
      deleteImage(profilePicture.name, "profile-picture");
    }
  }
  setIsLoading(false);
};

export default userRegister;

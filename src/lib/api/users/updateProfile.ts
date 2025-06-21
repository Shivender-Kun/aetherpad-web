import uploadImage, { deleteImage } from "@/services/firebaseStorage";
import { IUser, StoreContextType } from "@/types";
import errorHandler from "@/lib/errorHandler";
import getCSRFToken from "@/lib/getCSRFToken";
import { RefObject } from "react";
import { API } from "@/constants";
import axios from "axios";

type UserUpdateProps = {
  data: Partial<IUser>;
  coverPictureRef: RefObject<HTMLInputElement | null>;
  profilePictureRef: RefObject<HTMLInputElement | null>;
  setIsLoading: (isLoading: boolean) => void;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const updateProfile = async ({
  data,
  setIsLoading,
  setAPIMessage,
  coverPictureRef,
  profilePictureRef,
}: UserUpdateProps) =>
  await errorHandler({
    apiCall: async () => {
      let profilePicture: File | null = null;
      let coverPicture: File | null = null;

      const csrfToken = getCSRFToken();
      const headers = {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken || "",
      };

      const requestData = { ...data };
      delete requestData.profilePicture;

      try {
        if (profilePictureRef.current?.files) {
          profilePicture = profilePictureRef.current.files[0];

          if (profilePicture) {
            const profilePictureURL = await uploadImage(
              profilePicture,
              data.email!,
              "profile-picture"
            );
            requestData.profilePicture = profilePictureURL;
          }
        }

        if (coverPictureRef.current?.files) {
          coverPicture = coverPictureRef.current.files[0];

          if (coverPicture) {
            const coverPictureURL = await uploadImage(
              coverPicture,
              data.email!,
              "cover-picture"
            );
            requestData.coverPicture = coverPictureURL;
          }
        }

        const response = await axios.patch(
          API.USER.UPDATE_PROFILE,
          requestData,
          { headers }
        );

        if (response.status === 200) {
          setAPIMessage({
            notify: true,
            type: "success",
            message: response.data.message,
          });
        } else {
          if (profilePicture) {
            await deleteImage(data.email!, "profile-picture");
          }
          if (coverPicture) {
            await deleteImage(data.email!, "cover-picture");
          }
        }
      } catch (error) {
        if (profilePicture) {
          await deleteImage(data.email!, "profile-picture");
        }
        if (coverPicture) {
          await deleteImage(data.email!, "cover-picture");
        }
        throw error;
      }
    },
    setIsLoading,
    setAPIMessage,
  });

export default updateProfile;

import { IUser, StoreContextType } from "@/types";
import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

type UserUpdateProps = {
  data: Partial<IUser>;
  setIsLoading: (isLoading: boolean) => void;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const updateProfile = async ({
  data,
  setIsLoading,
  setAPIMessage,
}: UserUpdateProps) =>
  await errorHandler({
    apiCall: async () => {
      const payload = { ...data };
      delete payload.email;

      const response = await axios.post(API.USER.UPDATE_PROFILE, payload);
      if (response.status === 200)
        return setAPIMessage({
          notify: true,
          type: "success",
          message: response.data.message,
        });
    },
    setIsLoading,
    setAPIMessage,
  });

export default updateProfile;

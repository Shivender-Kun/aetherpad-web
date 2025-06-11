import { IUser, StoreContextType } from "@/types";
import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

type UserUpdateProps = {
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  data: Partial<IUser>;
};

const updateProfile = async ({
  data,
  setAPIMessage,
  setIsLoading,
}: UserUpdateProps) => {
  setAPIMessage(null);
  setIsLoading(true);

  const payload = { ...data };
  delete payload.email;

  try {
    const response = await axios.post(API.USER.UPDATE_PROFILE, payload);

    if (response.status === 200)
      setAPIMessage({
        notify: true,
        type: "success",
        message: response.data.message,
      });
  } catch (error) {
    errorHandler(error, setAPIMessage);
  }
};

export default updateProfile;

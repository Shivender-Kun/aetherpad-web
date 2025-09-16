import { API } from "@/constants/frontend";
import {
  TRegisterUserSchema,
  TResetPasswordSchemaTransformed,
  TUpdateUserSchemaParsed,
  TUserLoginSchema,
} from "@/lib/schemas";
import errorHandler from "@/lib/utils/errorHandler";
import axiosInstance from "../setupAxios";

type LoadingHandler = (value: boolean) => void;

type SIGNUP_PROPS = {
  data: TRegisterUserSchema;
  setIsLoading: LoadingHandler;
};

const signup = ({ data, setIsLoading }: SIGNUP_PROPS) => {
  return errorHandler({
    apiCall: async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profilePicture", data.profilePicture);

      const response = await axiosInstance.post(API.USER.SIGNUP, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response;
    },
    setIsLoading,
  });
};

type SIGNIN_PROPS = {
  data: TUserLoginSchema;
  setIsLoading: LoadingHandler;
};

const signin = ({ data, setIsLoading }: SIGNIN_PROPS) => {
  return errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.post(API.USER.SIGNIN, data);
      return response;
    },
    setIsLoading,
  });
};

type UPDATE_PROFILE_PROPS = {
  data: TUpdateUserSchemaParsed;
  setIsLoading: LoadingHandler;
};

const updateProfile = ({ data, setIsLoading }: UPDATE_PROFILE_PROPS) => {
  return errorHandler({
    apiCall: async () => {
      const formdata = new FormData();
      formdata.append("username", data.username);
      if (data.profilePicture instanceof File)
        formdata.append("profilePicture", data.profilePicture);
      if (data.coverPicture instanceof File)
        formdata.append("coverPicture", data.coverPicture);

      const response = await axiosInstance.patch(API.USER.PROFILE, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response;
    },
    setIsLoading,
  });
};

type FORGOT_PASSWORD_PROPS = {
  email: string;
  setIsLoading: LoadingHandler;
};

const forgotPassword = ({ email, setIsLoading }: FORGOT_PASSWORD_PROPS) => {
  return errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.post(API.USER.FORGOT_PASSWORD, {
        email,
      });
      return response;
    },
    setIsLoading,
  });
};

type RESET_PASSWORD_PROPS = {
  data: TResetPasswordSchemaTransformed;
  setIsLoading: LoadingHandler;
};

const resetPassword = ({ data, setIsLoading }: RESET_PASSWORD_PROPS) => {
  return errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.post(API.USER.RESET_PASSWORD, data);
      return response;
    },
    setIsLoading,
  });
};

const deleteAccount = () => {
  return errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.post(API.USER.DELETE);
      if (response.status === 200) window.location.href = "/signin";
    },
  });
};

const logout = () => {
  return errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.post(API.USER.LOGOUT);
      if (response.status === 200) window.location.href = "/signin";
    },
  });
};

export default {
  signup,
  signin,
  updateProfile,
  forgotPassword,
  resetPassword,
  deleteAccount,
  logout,
};

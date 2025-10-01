import { API } from "@/constants/frontend";
import {
  TRegisterUserFormSchema,
  TResetPasswordSchema,
  TUpdateUserSchema,
  TUserLoginSchema,
} from "@/lib/schemas";
import errorHandler from "@/lib/utils/errorHandler";
import { signIn, signOut } from "next-auth/react";
import axiosInstance from "../setupAxios";

type LoadingHandler = (value: boolean) => void;

type SIGNUP_PROPS = {
  data: TRegisterUserFormSchema;
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
      return await signIn("credentials", {
        redirectTo: "/home",
        redirect: false,
        ...data,
      });
    },
    setIsLoading,
  });
};

type UPDATE_PROFILE_PROPS = {
  data: TUpdateUserSchema;
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
  data: TResetPasswordSchema;
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
      return await signOut();
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

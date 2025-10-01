import { createSlice } from "@reduxjs/toolkit";

type FAQ = { question: string; answer: string };

export type AppDetailsState = {
  appName: string;
  version: string;
  terms: string;
  privacy: string;
  about: string;
  faqs: FAQ[];
  announcement: {
    message: string;
    isActive: boolean;
    updatedAt: string | null;
  };
};

const initialState: AppDetailsState = {
  appName: "AetherPad",
  version: "1.0.0",
  terms: "",
  privacy: "",
  about: "",
  faqs: [],
  announcement: {
    message: "",
    isActive: false,
    updatedAt: null,
  },
};

const appDetailsSlice = createSlice({
  name: "appDetails",
  initialState,
  reducers: {
    hydrateAppDetails(state, action) {
      return { ...state, ...action.payload };
    },
    setAppDetails(state, action) {
      return { ...state, ...action.payload };
    },
    clearAppDetails() {
      return initialState;
    },
  },
});

export const { hydrateAppDetails, setAppDetails, clearAppDetails } =
  appDetailsSlice.actions;

export default appDetailsSlice.reducer;

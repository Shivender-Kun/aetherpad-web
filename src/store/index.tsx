import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import appDetailsReducer from "./slices/appDetails";
import labelsReducer from "./slices/labels";
import notesReducer from "./slices/notes";
import notificationsReducer from "./slices/notifications";
import userReducer from "./slices/user";

export const makeStore = (preloadedState?: unknown) => {
  return configureStore({
    reducer: {
      appDetails: appDetailsReducer,
      labels: labelsReducer,
      notes: notesReducer,
      notifications: notificationsReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Configure default middleware options if needed
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(
        // Only add logger in development and on client side
        process.env.NODE_ENV === "development" && typeof window !== "undefined"
          ? [logger]
          : [],
      ),
    preloadedState: preloadedState as unknown,
    devTools: process.env.NODE_ENV !== "production",
  });
};

let store: AppStore | undefined;

const getStore = () => {
  if (!store) {
    store = makeStore();
  }

  return store;
};

export default getStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

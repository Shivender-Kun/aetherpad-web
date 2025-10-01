import { createSlice } from "@reduxjs/toolkit";

export interface NotificationPayload {
  type: "error" | "success" | "info" | "warning";
  message: string;
}

export interface NotificationState {
  current: NotificationPayload | null;
}

const initialState: NotificationState = {
  current: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      const { type, message } = action.payload;
      state.current = { type, message };
    },
    resetNotifications(state) {
      state.current = null;
    },
  },
});

export const { setNotification, resetNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;

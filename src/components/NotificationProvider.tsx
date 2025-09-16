"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetNotifications } from "@/store/slices/notifications";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

const NotificationProvider = () => {
  const { current } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (current) {
      const { type, message } = current;

      if (type === "success") toast.success(message);
      else if (type === "error") toast.error(message);

      setTimeout(() => dispatch(resetNotifications()), 2000);
    }
  }, [current]);

  return <Toaster />;
};

export default NotificationProvider;

"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { API } from "@/constants";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const getOnlineStatus = async () => {
      try {
        const response = await axios.post(API.ONLINE_STATUS);
        if (response.status === 200) setIsOnline(true);
      } catch (error) {
        if (error instanceof AxiosError && error.code === "ERR_NETWORK") {
          setIsOnline(false);
        } else setIsOnline(true);
      }
    };

    const heartbeatInterval = setInterval(getOnlineStatus, 10000);

    return () => {
      window.addEventListener("beforeunload", () =>
        clearInterval(heartbeatInterval)
      );
    };
  }, []);

  return (
    !isOnline && (
      <div className="w-full fixed bottom-0 p-2 bg-destructive text-center z-30">
        <p className="">No Connection</p>
      </div>
    )
  );
};

export default ConnectionStatus;

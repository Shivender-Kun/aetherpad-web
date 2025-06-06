"use client";

import { ILabel, IUser, PaginatedData, StoreContextType } from "@/types";
import { useContext, useState, ReactNode } from "react";
import { createContext, memo, useEffect } from "react";
import { toast } from "sonner";

export const StoreContext = createContext<StoreContextType | null>(null);

const initialPaginatedData = {
  list: [],
  page: 1,
  limit: 50,
  hasMore: false,
  total: 0,
};

const StoreContextProvider = ({
  user,
  labels,
  children,
}: {
  user?: IUser;
  labels?: PaginatedData<ILabel>;
  children: ReactNode;
}) => {
  const [state, setState] = useState<StoreContextType>({
    apiMessage: null,
    setAPIMessage: (apiMessage) => {
      setState((prev) => ({ ...prev, apiMessage }));
    },
    user: user || null,
    setUser: (user) => {
      setState((prev) => ({ ...prev, user }));
    },
    notes: initialPaginatedData,
    setNotes: (notes) => {
      setState((prev) => ({ ...prev, notes }));
    },
    archivedNotes: initialPaginatedData,
    setArchivedNotes: (archivedNotes) => {
      setState((prev) => ({ ...prev, archivedNotes }));
    },
    pinnedNotes: [],
    setPinnedNotes: (pinnedNotes) => {
      setState((prev) => ({ ...prev, pinnedNotes }));
    },
    deletedNotes: initialPaginatedData,
    setDeletedNotes: (deletedNotes) => {
      setState((prev) => ({ ...prev, deletedNotes }));
    },
    labels: labels || initialPaginatedData,
    setLabels: (labels) => {
      setState((prev) => ({ ...prev, labels }));
    },
    isLoading: false,
    setIsLoading: (isLoading) => {
      setState((prev) => ({ ...prev, isLoading }));
    },
  });

  useEffect(() => {
    console.info("Current Store State: ", state);
  }, [state]);

  useEffect(() => {
    if (state.apiMessage) {
      const { type, message, notify } = state.apiMessage;
      if (notify) {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
      }

      setTimeout(() => state.setAPIMessage(null), 2000);
    }
  }, [state]);

  return (
    <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
  );
};

export default memo(StoreContextProvider);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

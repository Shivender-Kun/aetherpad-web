"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import type { AppStore } from "./index";
import store from "./index";

interface ProvidersProps {
  children: React.ReactNode;
}

function StoreProviders({ children }: ProvidersProps) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProviders;

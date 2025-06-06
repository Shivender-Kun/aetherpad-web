import isUserAuthenticated from "@/lib/api/isUserAuthenticated";
import { SidebarProvider } from "@/components/ui/sidebar";
import fetchDetails from "@/lib/api/users/fetchDetails";
import { ILabel, IUser, PaginatedData } from "@/types";
import Sidebar from "@/components/layout/sidebar";
import fetchLabels from "@/lib/api/fetchLabels";
import Header from "@/components/layout/header";
import StoreContextProvider from "@/store";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const sidebarStateOnLoad = async () => {
    const cookieStore = await cookies();
    const sidebar = cookieStore.get("sidebar_state");

    if (sidebar) return sidebar.value === "true";
    return false;
  };

  const isUserValid = await isUserAuthenticated();
  if (!isUserValid) redirect("/login");

  const [user, labels, sidebarState]: [
    user: IUser,
    labels: PaginatedData<ILabel>,
    sidebarState: boolean
  ] = await Promise.all([
    fetchDetails(),
    fetchLabels({}),
    sidebarStateOnLoad(),
  ]);

  return (
    <SidebarProvider defaultOpen={sidebarState}>
      <Sidebar user={user} />
      <StoreContextProvider user={user} labels={labels}>
        <div className="flex flex-col h-screen w-full">
          <Header user={user} />
          <div className="pt-4 pb-8 flex-1 overflow-auto">{children}</div>
        </div>
      </StoreContextProvider>
    </SidebarProvider>
  );
}

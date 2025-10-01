import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { labelsServerApi, userServerApi } from "@/lib/api";
import { ILabel, IUser, PaginatedData } from "@/lib/types";
import isSidebarOpen from "@/lib/utils/isSidebarOpen";
import { ReactNode } from "react";
import { LayoutHydrator } from "./_components/LayoutHydrator";
import Header from "./_components/layout/Header";
import Sidebar from "./_components/layout/Sidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  const [user, labels, sidebarOpen]: [
    user: IUser,
    labels: PaginatedData<ILabel>,
    sidebarOpen: boolean,
  ] = await Promise.all([
    userServerApi.fetch(),
    labelsServerApi.fetch({}),
    isSidebarOpen(),
  ]);

  return (
    <>
      <LayoutHydrator {...{ user, labels }} />
      <SidebarProvider defaultOpen={sidebarOpen}>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <SidebarInset className="min-w-0 flex-1">
            <div className="flex h-full flex-col overflow-auto">
              <Header />
              <div className="h-full w-full flex-1 overflow-auto p-4">
                {children}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
      {/* <ConnectionStatusBanner /> */}
    </>
  );
}

import { ThemeModeToggle } from "@/components/theme/theme-mode-toggle";
import isUserAuthenticated from "@/lib/api/isUserAuthenticated";
import AppLogoBig from "@/components/app/bigLogo";
import { redirect } from "next/navigation";
import StoreContextProvider from "@/store";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await isUserAuthenticated();
  if (userData) redirect("/home");

  return (
    <StoreContextProvider>
      <main className="grid place-items-center p-4 min-w-96 h-full overflow-auto">
        <div className="flex flex-col gap-6 items-center">
          <AppLogoBig />
          {children}
        </div>
        <div className="fixed bottom-4 right-4">
          <ThemeModeToggle />
        </div>
      </main>
    </StoreContextProvider>
  );
}

import { ThemeModeToggle } from "@/components/Theme/theme-mode-toggle";
import isUserAuthenticated from "@/lib/isUserAuthenticated";
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
      <main className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white grid place-items-center p-4 overflow-auto">
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
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

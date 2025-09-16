import AppLogoBig from "@/components/logo/Big";
import { ThemeModeToggle } from "@/components/theme/theme-mode-toggle";
import isUserAuthenticated from "@/lib/utils/isUserAuthenticated";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await isUserAuthenticated();
  if (userData) redirect("/home");

  return (
    <main className="grid min-h-screen w-full place-items-center overflow-auto p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <AppLogoBig />
        {children}
      </div>
      <div className="fixed right-4 bottom-4">
        <ThemeModeToggle />
      </div>
    </main>
  );
}

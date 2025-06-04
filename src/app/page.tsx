// import PushNotificationManager from "@/components/PushNotificationManager";
import { Button } from "@/components/ui/button";
import { Notebook } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <main className="h-screen grid place-items-center">
        <div className="flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col gap-4 text-center p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <Notebook size={36} />
              <h2 className="font-bold text-4xl md:text-5xl">Personal Notes</h2>
            </div>
            <p className="text-xl underline">Writing notes made easier</p>
          </div>

          <Link href="/login" className="w-full">
            <Button className="w-full">Get started!</Button>
          </Link>
        </div>
      </main>
      {/* <PushNotificationManager /> */}
    </>
  );
}

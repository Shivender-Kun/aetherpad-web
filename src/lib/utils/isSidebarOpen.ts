import { cookies } from "next/headers";

const isSidebarOpen = async () => {
  const cookieStore = await cookies();
  const sidebar = cookieStore.get("sidebar_state");
  return sidebar?.value === "true";
};

export default isSidebarOpen;

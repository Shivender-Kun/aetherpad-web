import { headers } from "next/headers";

const getRequestContext = async () => {
  return (await headers()).get("cookie");
};

export default getRequestContext;

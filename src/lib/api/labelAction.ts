import { StoreContextType } from "@/types";
import getCSRFToken from "./getCSRFToken";
import { API } from "@/constants";
import axios from "axios";

const labelAction = async ({
  id,
  action,
  data,
  showToast,
}: {
  id?: string;
  action: "ADD" | "DELETE" | "UPDATE";
  data?: { name: string };
  showToast: (props: StoreContextType["apiMessage"] | null) => void;
}) => {
  let endpoint;
  let response;

  const csrfToken = getCSRFToken();
  const headers = {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken || "",
  };

  if (action === "ADD") endpoint = API.LABELS.ADD;
  else endpoint = API.LABELS[action](id!);

  try {
    if (action === "ADD")
      response = await axios.post(endpoint, data, { headers });
    else if (action === "DELETE")
      response = await axios.delete(endpoint, { headers });
    else response = await axios.patch(endpoint, data, { headers });

    if (response.status !== 200) throw Error(response.data.message);

    showToast({
      notify: true,
      type: "success",
      message: response.data.message,
    });
  } catch (error: unknown) {
    let message = "An error occurred";
    if (error instanceof Error) message = error.message;
    showToast({ type: "error", message, notify: true });
    console.error(`Error updating ${action}:`, message);
  }
};

export default labelAction;

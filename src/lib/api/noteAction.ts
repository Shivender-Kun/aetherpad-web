import { StoreContextType } from "@/types";
import { API } from "@/constants";
import axios from "axios";

const noteAction = async ({
  id,
  action,
  showToast,
  data = {},
}: {
  id?: string;
  action:
    | "ADD"
    | "ARCHIVE"
    | "UNARCHIVE"
    | "PIN"
    | "UNPIN"
    | "DELETE"
    | "DELETE_PERMANENTLY"
    | "RESTORE"
    | "UPDATE";
  data?: {
    title?: string;
    content?: string;
    labels?: string[];
    bgColor?: string;
  };
  showToast: (props: StoreContextType["apiMessage"] | null) => void;
}) => {
  let endpoint;
  let response;

  if (action === "ADD") endpoint = API.NOTES.ADD;
  else if (action === "DELETE_PERMANENTLY") endpoint = API.NOTES.DELETE(id!);
  else endpoint = API.NOTES[action](id!);

  try {
    if (action === "ADD") response = await axios.post(endpoint, data);
    else if (action === "DELETE") response = await axios.delete(endpoint);
    else if (action === "DELETE_PERMANENTLY")
      response = await axios.delete(`${endpoint}?permanently=true`);
    else response = await axios.patch(endpoint, data);

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

export default noteAction;

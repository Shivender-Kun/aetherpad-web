import errorHandler from "../errorHandler";
import { StoreContextType } from "@/types";
import getCSRFToken from "../getCSRFToken";
import { API } from "@/constants";
import axios from "axios";

type NOTE_ACTION_PROPS = {
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
    isPinned?: boolean;
  };
  setAPIMessage: (props: StoreContextType["apiMessage"] | null) => void;
};

const noteAction = async ({
  id,
  action,
  setAPIMessage,
  data = {},
}: NOTE_ACTION_PROPS) => {
  errorHandler({
    apiCall: async () => {
      let endpoint;
      let response;
      const csrfToken = getCSRFToken();
      const headers = {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken || "",
      };

      if (action === "ADD") endpoint = API.NOTES.ADD;
      else endpoint = API.NOTES[action](id!);

      if (action === "ADD")
        response = await axios.post(endpoint, data, { headers });
      else if (action === "DELETE_PERMANENTLY")
        response = await axios.delete(endpoint, { headers });
      else response = await axios.patch(endpoint, data, { headers });

      if (response.status !== 200) throw Error(response.data.message);

      setAPIMessage({
        notify: true,
        type: "success",
        message: response.data.message,
      });
    },
    setAPIMessage,
  });
};

export default noteAction;

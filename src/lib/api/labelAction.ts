import { StoreContextType } from "@/types";
import errorHandler from "../errorHandler";
import getCSRFToken from "../getCSRFToken";
import { API } from "@/constants";
import axios from "axios";

type LABEL_ACTION_PROPS = {
  id?: string;
  data?: { name: string };
  action: "ADD" | "DELETE" | "UPDATE";
  setIsLoading: (isLoading: boolean) => void;
  setAPIMessage: (props: StoreContextType["apiMessage"] | null) => void;
};

const labelAction = async ({
  id,
  data,
  action,
  setIsLoading,
  setAPIMessage,
}: LABEL_ACTION_PROPS) =>
  errorHandler({
    apiCall: async () => {
      let endpoint;
      let response;
      const csrfToken = getCSRFToken();
      const headers = {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken || "",
      };

      if (action === "ADD") endpoint = API.LABELS.ADD;
      else endpoint = API.LABELS[action](id!);

      if (action === "ADD")
        response = await axios.post(endpoint, data, { headers });
      else if (action === "DELETE")
        response = await axios.delete(endpoint, { headers });
      else response = await axios.patch(endpoint, data, { headers });

      if (response.status === 200) {
        setAPIMessage({
          notify: true,
          type: "success",
          message: response.data.message,
        });

        return response;
      }
    },
    setIsLoading,
    setAPIMessage,
  });

export default labelAction;

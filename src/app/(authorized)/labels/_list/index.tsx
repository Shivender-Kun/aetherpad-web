import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import labelAction from "@/lib/api/labelAction";
import DeleteLabel from "../_delete";
import { useStore } from "@/store";
import { useEffect } from "react";
import { API } from "@/constants";
import { ILabel } from "@/types";
import EditLabel from "../_edit";
import axios from "axios";

const LabelsList = () => {
  const { labels, apiMessage, setLabels, setAPIMessage } = useStore();

  const deleteLabel = (labelId: string) =>
    labelAction({
      id: labelId,
      action: "DELETE",
      showToast: setAPIMessage,
    });

  const updateLabel = (labelId: string, data: { name: string }) =>
    labelAction({
      id: labelId,
      action: "UPDATE",
      data,
      showToast: setAPIMessage,
    });

  const fetchLablesList = async () => {
    try {
      const response = await axios.get(API.LABELS.GET_LIST);
      if (response.status !== 200) throw Error(response.data.message);

      setLabels(response.data.data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error(error);
    }
  };

  useEffect(() => {
    if (apiMessage?.type === "success") fetchLablesList();
  }, [apiMessage]);

  const renderLabelRow = (label: ILabel, idx: number) => (
    <TableRow className="p-4 border rounded-md max-w-80" key={label._id}>
      <TableCell className="p-2">{idx + 1}</TableCell>
      <TableCell className="p-2">{label.name}</TableCell>
      <TableCell className="flex gap-8">
        <EditLabel label={label} updateLabel={updateLabel} />
        <DeleteLabel label={label} deleteLabel={deleteLabel} />
      </TableCell>
    </TableRow>
  );

  const allLabels = () => labels.list?.map(renderLabelRow);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Sr. no</TableHead>
          <TableHead>Label</TableHead>
          <TableHead className="w-54">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{allLabels()}</TableBody>
    </Table>
  );
};

export default LabelsList;

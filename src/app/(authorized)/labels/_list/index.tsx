"use client";

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
import { useCallback, useEffect } from "react";
import { API } from "@/constants";
import { ILabel } from "@/types";
import EditLabel from "../_edit";
import axios from "axios";
import errorHandler from "@/lib/errorHandler";
import AddLabel from "../_add";

const LabelsList = () => {
  const {
    labels,
    apiMessage,
    setLabels,
    setAPIMessage,
    setIsLoading,
    isLoading,
  } = useStore();

  const deleteLabel = async (labelId: string) =>
    await labelAction({
      id: labelId,
      action: "DELETE",
      setIsLoading,
      setAPIMessage,
    });

  const updateLabel = async (labelId: string, data: { name: string }) =>
    await labelAction({
      id: labelId,
      action: "UPDATE",
      data,
      setIsLoading,
      setAPIMessage,
    });

  const fetchLablesList = useCallback(async () => {
    errorHandler({
      apiCall: async () => {
        const response = await axios.get(API.LABELS.GET_LIST);
        if (response.status !== 200) throw Error(response.data.message);
        setLabels(response.data.data);
      },
    });
  }, [setLabels]);

  useEffect(() => {
    if (apiMessage?.type === "success") fetchLablesList();
  }, [apiMessage, fetchLablesList]);

  const renderLabelRow = (label: ILabel, idx: number) => (
    <TableRow className="p-4 border rounded-md max-w-80" key={label._id}>
      <TableCell className="p-2">{idx + 1}</TableCell>
      <TableCell className="p-2">{label.name}</TableCell>
      <TableCell className="flex gap-8 justify-end">
        <EditLabel
          label={label}
          updateLabel={updateLabel}
          isLoading={isLoading}
        />
        <DeleteLabel
          label={label}
          deleteLabel={deleteLabel}
          isLoading={isLoading}
        />
      </TableCell>
    </TableRow>
  );

  const renderAllLabels = () => labels.list?.map(renderLabelRow);

  const renderNoLabels = (
    <TableRow className="p-4 border rounded-md max-w-80">
      <TableCell className="p-2 text-lg" colSpan={3}>
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="text-center">
            Bring order to your thoughts.
            <br />
            Your custom labels will appear here.
          </p>
          <div className="flex gap-4 items-center">
            Add new label
            <AddLabel />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead className="w-20">Sr. no</TableHead>
          <TableHead>Label</TableHead>
          <TableHead className="w-54 max-sm:w-30 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!!labels.list.length && renderAllLabels()}
        {!labels.list.length && renderNoLabels}
      </TableBody>
    </Table>
  );
};

export default LabelsList;

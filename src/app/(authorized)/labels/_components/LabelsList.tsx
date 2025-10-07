"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ILabel } from "@/lib/types";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useState } from "react";
import DeleteLabelButton from "./buttons/DeleteLabelButton";
import EditLabelButton from "./buttons/EditLabelButton";
import AddLabelDialog from "./dialog/AddLabelDialog";
import DeleteLabelDialog from "./dialog/DeleteLabelDialog";
import EditLabelDialog from "./dialog/EditLabelDialog";

type Props = { parentId: string };

const minSpaceForTable = 518;

const LabelsList = ({ parentId }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState<ILabel | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const { list: labels } = useAppSelector((state) => state.labels.data);

  const getParentWidth = useCallback(() => {
    const parentElement = document.getElementById(parentId);
    if (parentElement) {
      const boundingRect = parentElement.getBoundingClientRect();
      setParentWidth(boundingRect.width);
    }
  }, []);

  useEffect(() => {
    getParentWidth();

    window.addEventListener("resize", getParentWidth);
    return () => {
      window.removeEventListener("resize", getParentWidth);
    };
  }, [getParentWidth]);

  const handleSelectLabel = (label: ILabel) => {
    setSelectedLabel(label);
  };

  const handleEditClick = () => {
    setShowEditDialog((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog((prev) => !prev);
  };

  const labelRendererProps = {
    labels,
    handleEditClick,
    handleDeleteClick,
    handleSelectLabel,
  };

  return (
    <>
      {parentWidth < minSpaceForTable ? (
        <LabelsBadges {...labelRendererProps} />
      ) : (
        <LabelsTable {...labelRendererProps} />
      )}

      {selectedLabel && showEditDialog && (
        <EditLabelDialog
          label={selectedLabel}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
        />
      )}

      {selectedLabel && showDeleteDialog && (
        <DeleteLabelDialog
          label={selectedLabel}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        />
      )}
    </>
  );
};

export default LabelsList;

type LabelsRendererProps = {
  labels: ILabel[];
  handleSelectLabel: (label: ILabel) => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

const LabelsBadges = ({
  labels,
  handleSelectLabel,
  handleEditClick,
  handleDeleteClick,
}: LabelsRendererProps) => {
  const renderLabelBadge = (label: ILabel) => (
    <li
      key={label._id}
      className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black"
      onClick={() => handleSelectLabel(label)}
    >
      <p className="text-center whitespace-break-spaces">{label.name}</p>
      <div className="flex w-full justify-between gap-2">
        <EditLabelButton onClick={() => handleEditClick()} />
        <DeleteLabelButton onClick={() => handleDeleteClick()} />
      </div>
    </li>
  );

  const renderAllLabels = () => labels.map(renderLabelBadge);

  return (
    <ul className="flex list-none flex-col gap-4"> {renderAllLabels()} </ul>
  );
};

const LabelsTable = ({
  labels,
  handleSelectLabel,
  handleEditClick,
  handleDeleteClick,
}: LabelsRendererProps) => {
  const renderLabelRow = (label: ILabel, idx: number) => (
    <TableRow
      key={label._id}
      className="h-14.25 max-w-80 border-b"
      onClick={() => handleSelectLabel(label)}
    >
      <TableCell>{idx + 1}</TableCell>
      <TableCell>{label.name}</TableCell>

      <TableCell className={`flex justify-end gap-8`}>
        <EditLabelButton onClick={handleEditClick} />
        <DeleteLabelButton onClick={handleDeleteClick} />
      </TableCell>
    </TableRow>
  );

  const renderAllLabels = () => labels.map(renderLabelRow);

  const renderEmptyTable = (
    <TableRow className="max-w-80 rounded-md border p-4">
      <TableCell className="p-2 text-lg" colSpan={3}>
        <div className="flex flex-col items-center justify-center gap-4 p-6">
          <p className="text-center">
            Bring order to your thoughts.
            <br />
            Your custom labels will appear here.
          </p>
          <div className="flex items-center gap-4">
            Add new label
            <AddLabelDialog />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Table className="overflow-hidden rounded-lg">
      <TableHeader className="bg-white dark:bg-black">
        <TableRow className="h-13.25 text-lg">
          <TableHead className="w-20">Sr. no</TableHead>
          <TableHead>Label</TableHead>
          <TableHead className="w-54 text-right max-sm:w-30">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white dark:bg-black">
        {!!labels.length && renderAllLabels()}
        {!labels.length && renderEmptyTable}
      </TableBody>
    </Table>
  );
};

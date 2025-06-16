import { useCallback, useEffect, useState } from "react";
import DeletedNote from "../card/deletedNoteWithOptions";
import Note from "../card/noteWithOptions";
import { INote } from "@/types";

const OrganizeNotes = ({
  gap = 16,
  notes = [],
  parentId,
  itemWidth = 304,
  isDeletedList = false,
}: {
  gap?: number;
  notes?: INote[];
  parentId: string;
  itemWidth?: number;
  isDeletedList?: boolean;
}) => {
  const [organizedList, setOrganizedList] = useState([] as INote[][]);
  const [parentWidth, setParentWidth] = useState(0);

  const getParentWidth = useCallback(() => {
    const parentElement = document.getElementById(parentId);
    if (parentElement) {
      const boundingRect = parentElement.getBoundingClientRect();
      setParentWidth(boundingRect.width);
    }
  }, [parentId]);

  const calculateColumns = useCallback(() => {
    if (parentWidth === 0) return 1; // Avoid division by zero

    const columns = Math.floor(parentWidth / itemWidth);
    const columnsWidth = columns * itemWidth + (columns - 1) * gap;
    const remainingSpace = parentWidth - columnsWidth;

    if (remainingSpace < 0) {
      return Math.max(1, columns - 1); // Ensure at least one column
    }

    return columns;
  }, [parentWidth, itemWidth, gap]);

  useEffect(() => {
    getParentWidth();

    window.addEventListener("resize", getParentWidth);
    return () => {
      window.removeEventListener("resize", getParentWidth);
    };
  }, [getParentWidth]);

  useEffect(() => {
    if (notes.length > 0) {
      const columns = calculateColumns();

      if (columns) {
        const newList = Array.from({ length: columns }, () => [] as INote[]);

        notes.forEach((note, index) => {
          newList[index % columns]?.push(note);
        });
        setOrganizedList(newList);
      }
    }
  }, [notes, calculateColumns]);

  const renderItems = useCallback(() => {
    return organizedList.map((list, idx) => (
      <div className="flex flex-col gap-4" key={idx}>
        {list.map((note) =>
          isDeletedList ? (
            <DeletedNote key={note._id} note={note} />
          ) : (
            <Note key={note._id} note={note} />
          )
        )}
      </div>
    ));
  }, [organizedList, isDeletedList]);

  return renderItems();
};

export default OrganizeNotes;

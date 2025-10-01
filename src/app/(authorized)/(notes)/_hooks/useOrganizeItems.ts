import { useSidebar } from "@/components/ui/sidebar";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Custom hook to organize items into columns based on parent container width.
 */
type Props<T> = {
  /** Gap between items in pixels */
  gap?: number;
  /** Array of items to be organized */
  items?: T[];
  /** ID of the parent container element */
  parentId: string;
  /** Width of each item in pixels */
  itemWidth?: number;
};

const useOrganizeItems = <T>({
  gap = 16,
  items = [],
  parentId,
  itemWidth = 320,
}: Props<T>): [T[][], number] => {
  const [organizedList, setOrganizedList] = useState<T[][]>([]);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [availableItemWidth, setAvailableItemWidth] =
    useState<number>(itemWidth);

  const { open: sidebarState } = useSidebar();
  const [oldSidebarState, setOldSidebarState] = useState(sidebarState);

  const getParentWidth = useCallback(() => {
    const getWidth = () => {
      const parentElement = document.getElementById(parentId);
      if (parentElement) {
        const boundingRect = parentElement.getBoundingClientRect();
        setParentWidth(boundingRect.width - 10); // 8 is combined padding on the container's x-axis and scrollbar
      }
    };

    if (sidebarState !== oldSidebarState) {
      setTimeout(getWidth, 210);
      setOldSidebarState(sidebarState);
    } else getWidth();
  }, [parentId, sidebarState]);

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

  const calculateAvailableItemWidth = useCallback(
    (columns: number) => {
      const usedSpace = itemWidth * columns + gap * (columns - 1);
      const remainingSpace = Math.floor(parentWidth) - usedSpace;
      const usableSpacePerNote = Math.floor(remainingSpace / columns);
      setAvailableItemWidth(usableSpacePerNote + itemWidth);
    },
    [parentWidth, itemWidth, gap],
  );

  useEffect(() => {
    getParentWidth();

    window.addEventListener("resize", getParentWidth);
    return () => {
      window.removeEventListener("resize", getParentWidth);
    };
  }, [getParentWidth, sidebarState]);

  useEffect(() => {
    if (items.length > 0 && parentWidth) {
      const columns = calculateColumns();

      if (columns) {
        const newList = Array.from({ length: columns }, () => [] as T[]);

        items.forEach((item, index) => {
          newList[index % columns]?.push(item);
        });

        calculateAvailableItemWidth(columns);
        setOrganizedList(newList);
      }
    }
  }, [
    items,
    parentWidth,
    sidebarState,
    calculateColumns,
    calculateAvailableItemWidth,
  ]);

  const memoizedList = useMemo(
    () => organizedList,
    [organizedList.length, organizedList.map((list) => list.length)],
  );

  return [memoizedList, availableItemWidth];
};

export default useOrganizeItems;

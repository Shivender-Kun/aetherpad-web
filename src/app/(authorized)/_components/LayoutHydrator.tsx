"use client";

import { ILabel, IUser, PaginatedData } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateLabels } from "@/store/slices/labels";
import { hydrateUser } from "@/store/slices/user";
import { useEffect } from "react";

interface LayoutHydratorProps {
  user: IUser;
  labels: PaginatedData<ILabel>;
}

export function LayoutHydrator({ user, labels }: LayoutHydratorProps) {
  const { initialized: userInitialized } = useAppSelector(
    (state) => state.user,
  );

  const { initialized: labelInitialized } = useAppSelector(
    (state) => state.labels,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (labels && !labelInitialized) dispatch(hydrateLabels(labels));
    if (user && !userInitialized) dispatch(hydrateUser(user));
  }, [dispatch, labels, user, labelInitialized, userInitialized]);

  return null;
}

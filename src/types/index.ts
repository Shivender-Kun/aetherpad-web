export interface IUser {
  email?: string;
  username: string;
  coverPicture: string;
  profilePicture: string;
  createdAt: Date;
  isPrivate?: boolean;
  dob?: Date;
}

export interface INote {
  _id: string;
  title: string;
  content: string;
  bgColor: string;
  labels: ILabel[];
  isPinned: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILabel {
  _id: string;
  name: string;
}

export interface PaginatedData<T> {
  list: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface StoreContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  notes: PaginatedData<INote>;
  setNotes: (data: PaginatedData<INote>) => void;
  archivedNotes: PaginatedData<INote>;
  setArchivedNotes: (data: PaginatedData<INote>) => void;
  pinnedNotes: INote[];
  setPinnedNotes: (data: INote[]) => void;
  deletedNotes: PaginatedData<INote>;
  setDeletedNotes: (data: PaginatedData<INote>) => void;
  labels: PaginatedData<ILabel>;
  setLabels: (data: PaginatedData<ILabel>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  apiMessage: {
    type: "error" | "success";
    message: string;
    notify?: boolean;
  } | null;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
}

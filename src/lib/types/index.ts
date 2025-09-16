export interface IUser {
  email: string;
  password: string;
  coverPicture: string;
  profilePicture: string;
  username: string;
  isDeleted: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserDetails = Omit<IUser, "password" | "isDeleted">;

export type IUserSignin = Pick<IUser, "email" | "password">;
export type IUserSignup = Pick<IUser, "email" | "password" | "profilePicture">;
export type IUserUpdate = Partial<
  Pick<IUser, "coverPicture" | "profilePicture" | "username">
>;

/** Note data received form APIs */
export interface INote {
  _id: string;
  title: string;
  content: string;
  bgColor: string;
  labels: ILabel[];
  isPinned: boolean;
  isArchived?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type INoteUpdate = Pick<INote, "title" | "content" | "bgColor"> & {
  labels: string[];
};

export type INoteUpdateLocal = Pick<
  INote,
  "title" | "content" | "bgColor" | "labels"
>;

export interface ILabel {
  _id: string;
  name: string;
}

export interface PaginatedData<T> {
  list: T[];
  page: number;
  limit: number;
  // total: number;
  hasMore: boolean;
}

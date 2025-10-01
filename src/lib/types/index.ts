import { NOTE_STATUS } from "./enums";

/** uuidv4 as `actionId` for actions:-
 * - Add
 * - Update
 * - Delete
 */
export interface ActionId {
  actionId: string;
}

/** User data received from the API
 * - email: string
 * - username: string
 * - coverPicture: string
 * - profilePicture: string
 * - createdAt: Date
 */
export interface IUser {
  email: string;
  username: string;
  coverPicture: string;
  profilePicture: string;
  createdAt: Date;
}

/** Note data received from the API
 * - _id: string
 * - title: string
 * - content: string
 * - bgColor: string
 * - labels: { _id: string, name: string }
 * - isPinned: boolean
 * - status: "active" | "archived" | "binned"
 */
export interface INote {
  _id: string;
  title: string;
  content: string;
  bgColor: string;
  labels: ILabel[];
  isPinned: boolean;
  status: NOTE_STATUS;
}

/** Note filter query payload
 * - labels: string | undefined
 * - search: string | undefined
 */
export interface INoteFilterQuery {
  labels?: string;
  search?: string;
}

/** Label data received from the API
 * - _id: string
 * - name: string
 */
export interface ILabel {
  _id: string;
  name: string;
}

/** Pagination query payload
 * - page: number | undefined
 * - limit: number | undefined
 */
export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

/** Paginated note data received from the API
 * - list: T[], where T can be note or label
 * - page: number
 * - limit: number
 * - hasMore: boolean
 */
export interface PaginatedData<T> {
  list: T[];
  page: number;
  limit: number;
  hasMore: boolean;
}

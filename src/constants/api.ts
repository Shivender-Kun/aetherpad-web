const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}api`; // Format http://localhost:3001/api/`;

const API = {
  // ADMIN API ENDPOINTS
  ADMIN: {
    LOGIN: `${BASE_URL}/admin/login`,
    REGISTER: `${BASE_URL}/admin/register`,
    DASHBOARD: `${BASE_URL}/admin/dashboard`,
  },

  // USER API ENDPOINTS
  USER: {
    LOGIN: `${BASE_URL}/users/login`,
    REGISTER: `${BASE_URL}/users/register`,
    DETAILS: `${BASE_URL}/users/details`,
    DELETE: `${BASE_URL}/users/delete`,
    LOGOUT: `${BASE_URL}/users/logout`,
    UPDATE_PROFILE: `${BASE_URL}/users/update`,
    FORGOT_PASSWORD: `${BASE_URL}/users/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/users/reset-password`,
  },

  // NOTE API ENDPOINTS
  NOTES: {
    ADD: `${BASE_URL}/notes`,
    UPDATE: (id: string) => `${BASE_URL}/notes/${id}`,
    DELETE_PERMANENTLY: (id: string) => `${BASE_URL}/notes/${id}`,
    DELETE: (id: string) => `${BASE_URL}/notes/${id}/delete`,
    ARCHIVE: (id: string) => `${BASE_URL}/notes/${id}/archive`,
    UNARCHIVE: (id: string) => `${BASE_URL}/notes/${id}/unarchive`,
    PIN: (id: string) => `${BASE_URL}/notes/${id}/pin`,
    UNPIN: (id: string) => `${BASE_URL}/notes/${id}/unpin`,
    RESTORE: (id: string) => `${BASE_URL}/notes/${id}/restore`,
    GET_LIST: `${BASE_URL}/notes`,
  },

  // LABEL API ENDPOINTS
  LABELS: {
    ADD: `${BASE_URL}/labels`,
    UPDATE: (id: string) => `${BASE_URL}/labels/${id}`,
    DELETE: (id: string) => `${BASE_URL}/labels/${id}`,
    GET_LIST: `${BASE_URL}/labels`,
  },

  ONLINE_STATUS: `${BASE_URL}/heartbeat`,
} as const;

export default API;

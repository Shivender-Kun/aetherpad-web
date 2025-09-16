const API_ENDPOINTS = (BASE_URL = "/api/v1") => ({
  // ADMIN API ENDPOINTS
  ADMIN: {
    SIGNIN: `${BASE_URL}/admin/signin`,
    SIGNUP: `${BASE_URL}/admin/signup`,
    DASHBOARD: `${BASE_URL}/admin/dashboard`,
  },

  // USER API ENDPOINTS
  USER: {
    SIGNIN: `${BASE_URL}/user/signin`,
    SIGNUP: `${BASE_URL}/user/signup`,
    PROFILE: `${BASE_URL}/user/profile`,
    DELETE: `${BASE_URL}/user/delete`,
    LOGOUT: `${BASE_URL}/user/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/user/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/user/reset-password`,
  },

  // NOTE API ENDPOINTS
  NOTES: {
    ADD: `${BASE_URL}/notes`,
    UPDATE: (id: string) => `${BASE_URL}/notes/${id}`,
    DELETE: (id: string) => `${BASE_URL}/notes/${id}`,
    TRASH: (id: string) => `${BASE_URL}/notes/${id}/trash`,
    BACKGROUND: (id: string) => `${BASE_URL}/notes/${id}/background`,
    ARCHIVE: (id: string) => `${BASE_URL}/notes/${id}/archive`,
    UNARCHIVE: (id: string) => `${BASE_URL}/notes/${id}/unarchive`,
    PIN: (id: string) => `${BASE_URL}/notes/${id}/pin`,
    UNPIN: (id: string) => `${BASE_URL}/notes/${id}/unpin`,
    RESTORE: (id: string) => `${BASE_URL}/notes/${id}/restore`,
    GET_LIST: `${BASE_URL}/notes`,
    GET: (type: string) => `${BASE_URL}/notes/${type}`,
  },

  // LABEL API ENDPOINTS
  LABELS: {
    ADD: `${BASE_URL}/labels`,
    UPDATE: (id: string) => `${BASE_URL}/labels/${id}`,
    DELETE: (id: string) => `${BASE_URL}/labels/${id}`,
    GET_LIST: `${BASE_URL}/labels`,
  },

  ONLINE_STATUS: `${BASE_URL}/heartbeat`,
});

export default API_ENDPOINTS;

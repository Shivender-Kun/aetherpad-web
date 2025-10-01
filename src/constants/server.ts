import API_ENDPOINTS from "./api";
import { ENV } from "./env";

const BASE_SERVER_URL = `${ENV.SERVER_URL}api/${ENV.API_VERSION}`; // Format http://localhost:3001/api/v1`;
const BASE_PROXY_URL = `${ENV.PROXY_URL}api/${ENV.API_VERSION}`; // Format http://localhost:3000/api/v1`;

export const API = API_ENDPOINTS(BASE_SERVER_URL);

export const API_PROXY = API_ENDPOINTS(BASE_PROXY_URL);

export const JWT_SECRET = process.env.JWT_SECRET;

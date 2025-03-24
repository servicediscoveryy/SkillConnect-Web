import axios from "axios";
import { BASEURL } from "../../constant";

const api = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  timeout: 50000,
  withCredentials: true, // ✅ Correct placement
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;

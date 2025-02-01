import axios from "axios";

import { BASEURL } from "../../constant";

const authApi = axios.create({
  baseURL: `${BASEURL}`,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    if (error.response) {
      console.log(error);
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      }
      if (error.response.status === 500) {
        console.error("Server Error!");
      }
    }
    return Promise.reject(error);
  }
);

import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Max-Age": "OPTIONS",
  },
});

axiosClient.interceptors.request.use();
axiosClient.interceptors.response.use();

export default axiosClient;

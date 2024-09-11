import axios from "axios";

const axiosInstance = axios.create({
  // baseURL:
  //   import.meta.mode === "development" ? "https://localhost:8000/api" : "/api",
  baseURL:"https://carryall.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;

import axios from "axios";
import { useAuthStore } from "./auth-store";

const instance = axios.create({
  baseURL: "https://webdev2-a5a67f9ba660.herokuapp.com/",
});

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token || localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

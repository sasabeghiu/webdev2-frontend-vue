import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/",
});

instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error("No token found in localStorage.");
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

export default instance;

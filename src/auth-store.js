import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    username: "",
    token: "",
  }),
  getters: {
    isLoggedIn: (state) => state.username != "",
    getToken: (state) => state.token,
  },
  actions: {
    login(username, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost/users/login", {
            username: username,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            this.username = res.data.username;
            this.token = res.data.jwt;
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("token", res.data.jwt);
            console.log("Token stored:", localStorage.getItem("token"));
            resolve();
          })
          .catch((err) => reject(err));
      });
    },
    autoLogin() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      if (token && username) {
        this.token = token;
        this.username = username;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
        console.error("Token not found in localStorage.");
      }
    },
  },
});

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
            this.username = res.data.username;
            this.token = res.data.jwt;
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("token", res.data.jwt);
            localStorage.setItem("id", res.data.id);
            console.log("Token stored:", localStorage.getItem("token"));
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.jwt;
            resolve();
          })
          .catch((err) => reject(err));
      });
    },
    autoLogin() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const id = localStorage.getItem("id");
      if (token && username) {
        this.token = token;
        this.username = username;
        this.id = id;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
        console.error("Token not found in localStorage.");
      }
    },
    logout() {
      this.username = "";
      this.token = "";
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      console.log("User logged out successfully.");
    },
    register(username, password, email) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost/users/register", {
            username: username,
            password: password,
            email: email,
            role_id: 2, // user by default
          })
          .then(() => {
            resolve();
          })
          .catch((err) => reject(err));
      });
    },
  },
});

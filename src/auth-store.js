import { defineStore } from "pinia";
import axios from "axios";
import { useCartStore } from "./cart-store";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    username: "",
    token: "",
    id: "",
    role_id: "", // Ensure initial state reflects all possible user properties
  }),
  getters: {
    isLoggedIn: (state) => !!state.username, // Ensure boolean correctness
    getToken: (state) => state.token,
    getId: (state) => state.id,
    isAdmin: (state) => state.role_id === "1", // Check if this should be a string or number
  },
  actions: {
    login(username, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost/users/login", { username, password })
          .then(async (res) => {
            this.$patch({
              username: res.data.username,
              token: res.data.jwt,
              id: res.data.id,
              role_id: res.data.role_id,
            });

            localStorage.setItem("username", res.data.username);
            localStorage.setItem("token", res.data.jwt);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("role_id", res.data.role_id);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.jwt;

            await this.fetchUserDetails();

            const cartStore = useCartStore();
            await cartStore.fetchItemCount();

            resolve();
          })
          .catch((err) => {
            console.error("Login error:", err);
            reject(err);
          });
      });
    },
    autoLogin() {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const role_id = localStorage.getItem("role_id");

      if (token && username && id && role_id) {
        this.$patch({ username, token, id, role_id });
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        this.fetchUserDetails();
      } else {
        console.error("Essential credentials are missing from localStorage.");
      }
    },
    logout() {
      this.$reset(); // This resets the store to its initial state
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role_id");
      delete axios.defaults.headers.common["Authorization"];
      const cartStore = useCartStore();
      cartStore.setItemCount(0);
      console.log("User logged out successfully.");
    },
    register(username, password, email) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost/users/register", {
            username,
            password,
            email,
            role_id: 2, // Assuming '2' is the role_id for regular users
          })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.error("Registration error:", err);
            reject(err);
          });
      });
    },
    async fetchUserDetails() {
      if (!this.id) return; // Prevents fetching without an ID
      try {
        const response = await axios.get(`http://localhost/users/${this.id}`);
        this.role_id = response.data.role_id; // Assuming the backend sends `role_id`
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    },
  },
});

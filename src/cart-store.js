import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    itemCount: 0,
  }),
  actions: {
    setItemCount(count) {
      this.itemCount = count;
    },
    incrementItemCount() {
      this.itemCount++;
    },
    decrementItemCount() {
      if (this.itemCount > 0) {
        this.itemCount--;
      }
    },
    async fetchItemCount() {
      try {
        const response = await axios.get(
          `http://localhost/cartitems/user/${localStorage.getItem("id")}/count`
        );
        this.setItemCount(response.data);
      } catch (error) {
        console.error("Error fetching cart items count:", error);
      }
    },
  },
});

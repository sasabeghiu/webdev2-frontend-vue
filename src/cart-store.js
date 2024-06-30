import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    itemCount: 0,
    cartItems: [],
    totalPrice: 0,
  }),
  actions: {
    clearCart() {
      this.items = [];
      this.itemCount = 0;
    },
    setItemCount(count) {
      this.itemCount = count;
    },
    incrementItemCount() {
      this.itemCount++;
    },
    decrementItemCount() {
      if (this.itemCount > 0) {
        this.itemCount -= 1;
      }
    },
    setCartItems(items) {
      this.cartItems = items;
    },
    setTotalPrice(price) {
      this.totalPrice = price;
    },
    async fetchItemCount() {
      try {
        const response = await axios.get(
          `https://webdev2-a5a67f9ba660.herokuapp.com/cartitems/user/${localStorage.getItem("id")}/count`
        );
        this.setItemCount(response.data);
      } catch (error) {
        console.error("Error fetching cart items count:", error);
      }
    },
  },
});

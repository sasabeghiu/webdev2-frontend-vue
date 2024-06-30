<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Shopping Carts</h2>
            <div class="row mt-3">
                <shoppingCart-list-item v-for="shoppingCart in shoppingCarts" :key="shoppingCart.id"
                    :shoppingCart="shoppingCart" @update="update" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import ShoppingCartListItem from "./ShoppingCartListItem.vue";

export default {
    name: "ShoppingCartList",
    components: {
        ShoppingCartListItem,
    },
    data() {
        return {
            shoppingCarts: [],
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            axios
                .get("https://webdev2-a5a67f9ba660.herokuapp.com/shoppingcarts")
                .then((result) => {
                    console.log(result);
                    this.shoppingCarts = result.data;
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>
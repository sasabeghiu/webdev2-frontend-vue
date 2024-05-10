<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Shop</h2>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search product" v-model="searchTerm">
                <button class="btn btn-success" @click="update">Search</button>
            </div>
            <div class="row mt-3">
                <product-list-item v-for="product in products" :key="product.id" :product="product" @update="update" />
                <div class="col-12" v-if="products.length === 0 && wasSearched">
                    <h5 class="text-center">Sorry, we don't have this product.</h5>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import ProductListItem from "./ShopListItem.vue";

export default {
    name: "ShopList",
    components: {
        ProductListItem,
    },
    data() {
        return {
            products: [],
            searchTerm: '',
            wasSearched: false
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            const params = new URLSearchParams();
            this.wasSearched = true;
            if (this.searchTerm) {
                params.append('name', this.searchTerm);
                params.append('offset', 0);
                params.append('limit', 5);
            }
            axios
                .get(`http://localhost/products?${params.toString()}`)
                .then((result) => {
                    console.log(result);
                    this.products = result.data;
                    if (this.products.length === 0) {
                        console.log("No products found for: " + this.searchTerm);
                    }
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>

<style></style>
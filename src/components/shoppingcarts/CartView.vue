<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Shopping Cart</h2>
            <button type="button" class="btn btn-success mt-3" @click="this.$router.push('/shop');">
                Add more products
            </button>
            <div class="row mt-3">
                <cart-item v-for="cartItem in cartItems" :key="cartItem.id" :cartItem="cartItem"
                    @update-cart="fetchCartItems" @cart-item-deleted="handleItemDeletion" />
            </div>
            <button type="button" class="btn btn-success mt-3" @click="this.$router.push('/');">
                Proceed to checkout
            </button>
            <h3 class="mt-3 mt-lg-5">Total Price: {{ totalPrice }} €</h3>
        </div>
    </section>
</template>

<script>
import { useCartStore } from '../../cart-store';
import axios from 'axios';
import CartItem from './CartItem.vue';

export default {
    name: 'CartView',
    components: {
        CartItem
    },
    data() {
        return {
            cartItems: [],
            userId: localStorage.getItem('id')
        };
    },
    created() {
        this.fetchCartItems();
    },
    computed: {
        // Computed property to calculate the total price of the cart
        totalPrice() {
            return this.cartItems.reduce((sum, item) => sum + (parseFloat(item.product_price) * item.quantity), 0).toFixed(2);
        }
    },
    methods: {
        fetchCartItems() {
            if (this.userId) {
                axios.get(`http://localhost/shoppingcarts/user_${this.userId}`)
                    .then(response => {
                        this.cartItems = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching cart items:', error);
                        // Handle empty cart or error fetching cart
                        if (error.response && error.response.status === 404) {
                            this.cartItems = [];  // Assume the cart is empty if a 404 error occurs
                        }
                    });
            } else {
                console.error('User ID not found.');
            }
        },
        handleItemDeletion(itemId) {
            this.cartItems = this.cartItems.filter(item => item.id !== itemId); // Remove item from local list
        }
    }

};
</script>

<template>
    <div class="checkout">
        <h1>Checkout</h1>
        <div v-for="item in cartItems" :key="item.id">
            <p>{{ item.product_name }} - Quantity: {{ item.quantity }}</p>
        </div>
        <p>Total Price: {{ totalPrice }}</p>
        <button @click="placeOrder">Place Order</button>
    </div>
</template>

<script>
import { useCartStore } from '../cart-store';
import axios from 'axios';

export default {
    name: 'Checkout',
    setup() {
        const cartStore = useCartStore();
        return { cartStore, placeOrder: () => placeOrder(cartStore) };
    },
    data() {
        return {
            cartItems: [],
            totalPrice: 0,
        };
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            if (this.$route.query.cartItems) {
                try {
                    this.cartItems = JSON.parse(decodeURIComponent(this.$route.query.cartItems));
                    this.totalPrice = parseFloat(this.$route.query.totalPrice).toFixed(2);
                } catch (error) {
                    console.error('Error parsing cart items:', error);
                }
            }
        },
        placeOrder() {
            axios.post('http://localhost/orders', {
                items: this.cartItems,
                total: this.totalPrice
            }).then(response => {
                alert('Your order has been placed successfully!');
            }).catch(error => {
                alert('There was an error placing your order.');
                console.error('Order Placement Error:', error);
            });
        }
    }
};
</script>

<style scoped>
.checkout {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
</style>
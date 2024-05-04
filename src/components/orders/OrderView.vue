<template>
    <div class="thank-you">
        <h1>Thank You for Your Order!</h1>
        <div v-if="order">
            <h2>Order Summary:</h2>
            <p><strong>Order ID:</strong> {{ order.id }}</p>
            <p><strong>Order Status:</strong> {{ order.status }}</p>
            <p><strong>Total:</strong> €{{ order.total }}</p>
            <p><strong>Order Date:</strong> {{ new Date(order.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }) }}</p>
            <div>
                <h3>Items:</h3>
                <div v-for="item in order.items" :key="item.id" style="border: solid 1px black;" class="mb-2">
                    <p>Product ID: {{ item.product_id }}</p>
                    <p><small>Quantity: {{ item.quantity }}</small></p>
                    <p><small>Price: € {{ item.price }}</small></p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading order details...</p>
        </div>
        <button class="btn btn-primary" @click="goToShop">Continue Shopping</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'OrderView',
    data() {
        return {
            order: null
        };
    },
    mounted() {
        this.fetchOrderDetails();
    },
    methods: {
        fetchOrderDetails() {
            const orderId = this.$route.params.id;
            if (orderId) {
                axios.get(`http://localhost/orders/${orderId}`)
                    .then(response => {
                        this.order = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching order details:', error);
                    });
            } else {
                console.error('Order ID not provided.');
            }
        },
        goToShop() {
            this.$router.push('/shop');
        }
    }
};
</script>

<style scoped>
.thank-you {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}
</style>
<template>
    <div class="user-orders">
        <h1>My Orders</h1>
        <div v-for="order in orders" :key="order.id" class="order">
            <h2>Order ID: {{ order.id }} - Total: €{{ order.total }}</h2>
            <p><strong>Order Status:</strong> {{ order.status }}</p>
            <p>Ordered on: {{ new Date(order.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }) }}</p>
            <div v-for="item in order.items" :key="item.id" style="border: solid 1px black;" class="mb-2 p-1">
                <p>Product ID: {{ item.product_id }}</p>
                <p><small>Quantity: {{ item.quantity }}</small></p>
                <p><small>Price: € {{ item.price }}</small></p>
            </div>
        </div>
        <div v-if="orders.length === 0">
            <p>No orders found.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserOrders',
    data() {
        return {
            orders: []
        };
    },
    created() {
        this.fetchUserOrders();
    },
    methods: {
        fetchUserOrders() {
            const userId = localStorage.getItem('id'); // Ensure user ID is stored and retrieved correctly
            if (userId) {
                axios.get(`http://localhost/orders/user/${userId}`)
                    .then(response => {
                        this.orders = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching user orders:', error);
                    });
            } else {
                console.error('User ID not found');
            }
        }
    }
};
</script>

<style scoped>
.user-orders {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.order {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
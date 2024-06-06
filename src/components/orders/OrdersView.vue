<template>
    <div class="user-orders container mt-5">
        <h1 class="text-center mb-4">My Orders</h1>
        <div v-for="order in orders" :key="order.id" class="order card mb-4 shadow-sm">
            <div class="card-body">
                <h2 class="card-title">Order ID: {{ order.id }} - Total: €{{ formatTotal(order.total) }}</h2>
                <p class="card-text"><strong>Order Status:</strong> {{ order.status }}</p>
                <p class="card-text">Ordered on: {{ formatDate(order.created_at) }}</p>
                <div v-for="item in order.items" :key="item.id"
                    class="order-item border rounded mb-3 p-3 d-flex align-items-center">
                    <img :src="item.product?.image || 'https://via.placeholder.com/100'" alt="Product Image"
                        class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
                    <div>
                        <p class="mb-1"><strong>Product ID:</strong> {{ item.product_id }}</p>
                        <p class="mb-1"><small>Quantity: {{ item.quantity }}</small></p>
                        <p class="mb-1"><small>Price: € {{ formatTotal(item.price) }}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="orders.length === 0" class="text-center">
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
        async fetchUserOrders() {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost/orders/user/${userId}`);
                    const orders = response.data;
                    await this.populateProductDetails(orders);
                    this.orders = orders;
                } catch (error) {
                    console.error('Error fetching user orders:', error);
                }
            } else {
                console.error('User ID not found');
            }
        },
        async populateProductDetails(orders) {
            for (const order of orders) {
                for (const item of order.items) {
                    try {
                        const productResponse = await axios.get(`http://localhost/products/${item.product_id}`);
                        item.product = productResponse.data;
                    } catch (error) {
                        console.error(`Error fetching product details for product ID ${item.product_id}:`, error);
                    }
                }
            }
        },
        formatTotal(total) {
            return Number(total).toFixed(2);
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
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
    border: none;
    border-radius: 10px;
}

.card-title {
    font-size: 1.25rem;
}

.order-item {
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
}

.order-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
}

.card-body p {
    margin-bottom: 0.5rem;
}
</style>
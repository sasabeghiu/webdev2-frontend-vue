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
            <button type="button" class="btn btn-success mt-3" @click="proceedToCheckout">
                Proceed to checkout
            </button>
            <h3 class="mt-3 mt-lg-5">Total Price: {{ totalPrice }} €</h3>
        </div>
    </section>
</template>

<script>
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
                        if (error.response && error.response.status === 404) {
                            this.cartItems = [];
                        }
                    });
            } else {
                console.error('User ID not found.');
            }
        },
        handleItemDeletion(itemId) {
            this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        },
        async proceedToCheckout() {
            try {
                const response = await axios.post('http://localhost/orders', {
                    user_id: this.userId,
                    total: this.totalPrice,
                    status: 'ordered'
                });

                if (response.status === 201) {
                    const orderId = response.data.id;
                    let allItemsAdded = true;
                    for (let item of this.cartItems) {
                        const itemResponse = await axios.post('http://localhost/orders/items', {
                            order_id: orderId,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            price: item.product_price
                        });
                        if (itemResponse.status !== 201) {
                            allItemsAdded = false;
                            console.error('Failed to add item:', itemResponse.data);
                            break;
                        }
                    }
                    if (allItemsAdded) {
                        const deleteCartResponse = await axios.delete(`http://localhost/shoppingcarts/${this.cartItems[0].cart_id}`);
                        if (deleteCartResponse.status === 204) {
                            this.cartItems = [];
                            alert('Your order has been placed successfully and the cart has been cleared!');
                        } else {
                            console.error('Failed to clear cart:', deleteCartResponse.data);
                            alert('Order placed, but failed to clear the cart.');
                        }
                    } else {
                        alert('Order placed, but not all items could be added.');
                    }
                } else {
                    console.error('Error placing order:', response.data);
                    alert(`Failed to place order: ${response.data.message
                        }`);
                }
            } catch (error) {
                console.error('Order Placement Error:', error);
                if (error.response) {
                    console.error(`Error Details: `, error.response.data);
                }
                alert('There was an error placing your order.');
            }
        }
    }
};
</script>

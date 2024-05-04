<template>
  <section>
    <div class="container">
      <div class="hero-section">
        <img
          src="https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          class="img">
        <h2>Welcome to Our Security Services</h2>
        <p>Ensuring your safety with state-of-the-art solutions.</p>
      </div>
      <div class="services-section">
        <h3>Our Services</h3>
        <ul>
          <li v-for="service in services" :key="service.id">
            {{ service.name }} - {{ service.description }}
          </li>
        </ul>
      </div>
      <h3>Products</h3>
      <div class="products">
        <div v-for="product in products" :key="product.id" class="product">
          <img :src="product.image" class="product-image">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">Price: {{ product.price }}</div>
          <button class="btn btn-secondary product-add">Add to cart</button>
        </div>
      </div>
      <div class="about-us">
        <h3>About Us</h3>
        <p>Detailed information about your company.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      services: [],
      testimonials: [],
    };
  },
  mounted() {
    this.fetchServices();
    this.fetchProducts();
  },
  methods: {
    fetchServices() {
      axios.get("http://localhost/services")
        .then((response) => {
          this.services = response.data;
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
        });
    },
    fetchProducts() {
      axios.get("http://localhost/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }
};
</script>

<style scoped>
.img {
  position: relative;
  top: -25px;
  left: -312px;
  width: 1920px;
  height: 400px;
  background-repeat: no-repeat;
  background-position: center center;
  object-fit: cover;
  object-position: 0% 20%;
}

.products {
  display: flex;
}

.product {
  position: relative;
  border: 1px solid black;
  margin: 10px;
  padding: 15px;
  width: 250px;
  height: 300px;
}

.product-image {
  width: 100px;
  height: 100px;
}

.product-name {
  font-weight: bold;
}

.product-price {
  position: absolute;
  color: green;
  bottom: 0;
}

.product-add {
  position: absolute;
  bottom: 30px;
}

.services-section,
.testimonials-section,
.about-us {
  padding: 20px;
  background-color: #f8f9fa;
}
</style>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/services" class="nav-link" active-class="active">Services</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/categories" class="nav-link" active-class="active">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/roles" class="nav-link" active-class="active">Roles</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" class="nav-link" active-class="active">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shoppingcarts" class="nav-link" active-class="active">Shopping Carts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shop" class="nav-link" active-class="active">Shop</router-link>
        </li>

        <li class="nav-item" v-if="isLoggedIn">
          <button class="btn btn-outline-danger nav-link" active-class="active" @click="logout">Logout</button>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/login" class="btn btn-outline-danger nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../auth-store';

export default {
  name: "Navigation",
  computed: {
    isLoggedIn() {
      const authStore = useAuthStore();
      return authStore.isLoggedIn;
    }
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style></style>
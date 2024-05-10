<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <!-- Left-aligned links -->
      <ul class="navbar-nav me-auto mb-2 mb-md-0 px-5">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ourservices" class="nav-link" active-class="active">Services</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/aboutus" class="nav-link" active-class="active">About us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link" active-class="active">Contact</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shop" class="nav-link" active-class="active">Shop</router-link>
        </li>
        <li class="nav-item dropdown" v-if="isLoggedIn && isAdmin">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownCMS" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            CMS
          </a>
          <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownCMS">
            <li><router-link to="/products" class="dropdown-item text-white">Products</router-link></li>
            <li><router-link to="/services" class="dropdown-item text-white">Services</router-link></li>
            <li><router-link to="/categories" class="dropdown-item text-white">Categories</router-link></li>
            <li><router-link to="/roles" class="dropdown-item text-white">Roles</router-link></li>
            <li><router-link to="/users" class="dropdown-item text-white">Users</router-link></li>
            <li><router-link to="/orders" class="dropdown-item text-white">Orders</router-link></li>
          </ul>
        </li>
      </ul>

      <!-- Right-aligned links -->
      <ul class="navbar-nav ms-auto px-5">
        <div class="dropdown text-end navbar-nav ms-auto px-5" v-if="isLoggedIn">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./icons/images.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" style="">
            <li><router-link to="/myprofile" class="dropdown-item"><i class="bi bi-person-square"></i> My
                Profile</router-link></li>
            <li><router-link to="/shoppingcart" class="dropdown-item"><i class="bi bi-cart-check"></i> Shopping Cart
                <span class="badge bg-secondary">{{ cartItemCount }}</span></router-link></li>
            <li><router-link to="/orders/myorders/" class="dropdown-item"><i class="bi bi-basket-fill"></i> My
                Orders</router-link></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><button class="dropdown-item" @click="logout">Sign out</button></li>
          </ul>
        </div>
        <div class="dropdown text-end" v-else>
          <router-link to="/login" class="btn nav-link">Sign in</router-link>
        </div>
      </ul>
    </div>
  </nav>
</template>



<script>
import { useAuthStore } from '../auth-store';
import { useCartStore } from '../cart-store';

export default {
  name: "Navigation",
  data() {
    return {
      user_id: null,
    };
  },
  computed: {
    isLoggedIn() {
      const authStore = useAuthStore();
      return authStore.isLoggedIn;
    },
    isAdmin() {
      const authStore = useAuthStore();
      return authStore.isAdmin;
    },
    cartItemCount() {
      const cartStore = useCartStore();
      return cartStore.itemCount;
    }
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/login');
    },
  },
  created() {
    const cartStore = useCartStore();
    cartStore.fetchItemCount();
  }
};
</script>

<style></style>
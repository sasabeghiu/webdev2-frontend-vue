<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'
import { useAuthStore } from './auth-store';
export default {
  name: "App",
  components: {
    Navigation
  },
  created() {
    const authStore = useAuthStore();
    authStore.autoLogin();
  }
};
</script>

<style></style>

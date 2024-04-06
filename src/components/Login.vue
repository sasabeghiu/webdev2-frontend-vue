<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username</label>
              <input id="inputUsername" type="text" class="form-control" v-model="username" />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="inputPassword" v-model="password" />
            </div>
            <button type='button' class="btn btn-primary" @click="login()">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '../auth-store';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const store = useAuthStore();
      store.login(this.username, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  }
};
</script>

<style></style>
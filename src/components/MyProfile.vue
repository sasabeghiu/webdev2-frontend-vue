<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">My Profile</h2>
                <h5 class="mb-4">Update your information</h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Username</span>
                    <input type="text" class="form-control" v-model="user.username" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Password</span>
                    <input type="password" class="form-control" v-model="user.password"
                        placeholder="Enter new password" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Email</span>
                    <input type="email" class="form-control" v-model="user.email" />
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateUser">
                        Save changes
                    </button>
                    <button type="button" class="mx-2 btn btn-danger" @click="cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../auth-store';

export default {
    name: 'MyProfile',
    data() {
        return {
            user: {
                id: 0,
                username: '',
                password: null,  // Set default to null to check if changed
                email: '',
                role_id: 1,
            }
        };
    },
    methods: {
        updateUser() {
            let data = {
                username: this.user.username,
                email: this.user.email,
                role_id: this.user.role_id,  // Assuming you want to update role_id; omit if not
            };

            // Only send password if it has been modified
            if (this.user.password) {
                data.password = this.user.password;
            }

            axios
                .put(`http://localhost/users/${this.user.id}`, data)
                .then((response) => {
                    console.log(response.data);
                    this.$refs.form.reset();
                    this.user.password = null;  // Reset password field after update
                    alert('Profile updated successfully!');
                    const authStore = useAuthStore();
                    authStore.fetchUserDetails();  // Update store data
                })
                .catch((error) => {
                    console.error(error);
                    alert('Failed to update profile.');
                });
        },
        cancel() {
            this.$router.push('/');
        }
    },
    mounted() {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
            this.user.id = authStore.getId;
            this.user.username = authStore.username;
            this.user.email = authStore.getToken;
            this.user.role_id = authStore.isAdmin ? "1" : "2";
            axios
                .get(`http://localhost/users/${this.user.id}`)
                .then((response) => {
                    console.log(response);
                    this.user = { ...this.user, ...response.data };
                })
                .catch((error) => console.log(error));
        }
    },
};
</script>

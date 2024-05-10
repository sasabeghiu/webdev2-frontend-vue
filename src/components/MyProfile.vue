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
                    <input type="password" class="form-control" v-model="user.password" placeholder="New password" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Email</span>
                    <input type="email" class="form-control" v-model="user.email" />
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateUser">
                        Save changes
                    </button>
                    <button type="button" class="mx-2 btn btn-danger" @click="this.$router.push('/')">
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
                password: '',
                email: '',
                role_id: 1,
            }
        };
    },
    methods: {
        updateUser() {
            axios
                .put(`http://localhost/users/${this.user.id}`, this.user)
                .then((response) => {
                    console.log(this.user.id);
                    this.$refs.form.reset();
                    alert('Profile updated successfully!');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Failed to update profile.');
                });
        },
        cancel() {
            this.$router.push('/');
        },
    },
    mounted() {
        axios
            .get(`http://localhost/users/${this.user.id}`)
            .then((response) => {
                console.log(response);
                this.user = response.data;
            })
            .catch((error) => console.log(error));
    },
};
</script>

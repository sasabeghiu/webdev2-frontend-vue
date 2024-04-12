import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

import ProductList from "../components/products/ProductList.vue";
import CreateProduct from "../components/products/CreateProduct.vue";
import EditProduct from "../components/products/EditProduct.vue";

import CategoryList from "../components/categories/CategoryList.vue";
import CreateCategory from "../components/categories/CreateCategory.vue";
import EditCategory from "../components/categories/EditCategory.vue";

import RoleList from "../components/roles/RoleList.vue";
import CreateRole from "../components/roles/CreateRole.vue";
import EditRole from "../components/roles/EditRole.vue";

import ServiceList from "../components/services/ServiceList.vue";
import CreateService from "../components/services/CreateService.vue";
import EditService from "../components/services/EditService.vue";

import UserList from "../components/users/UserList.vue";
import CreateUser from "../components/users/CreateUser.vue";
import EditUser from "../components/users/EditUser.vue";

import ShoppingCartList from "../components/shoppingcarts/ShoppingCartList.vue";
import CreateShoppingCart from "../components/shoppingcarts/CreateShoppingCart.vue";
import EditShoppingCart from "../components/shoppingcarts/EditShoppingCart.vue";

import ShopList from "../components/products/ShopList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/shop", component: ShopList },

    { path: "/products", component: ProductList },
    { path: "/createproduct", component: CreateProduct },
    { path: "/editproduct/:id", component: EditProduct, props: true },

    { path: "/categories", component: CategoryList },
    { path: "/createcategory", component: CreateCategory },
    { path: "/editcategory/:id", component: EditCategory, props: true },

    { path: "/roles", component: RoleList },
    { path: "/createrole", component: CreateRole },
    { path: "/editrole/:id", component: EditRole, props: true },

    { path: "/services", component: ServiceList },
    { path: "/createservice", component: CreateService },
    { path: "/editservice/:id", component: EditService, props: true },

    { path: "/users", component: UserList },
    { path: "/createuser", component: CreateUser },
    { path: "/edituser/:id", component: EditUser, props: true },

    { path: "/shoppingcarts", component: ShoppingCartList },
    { path: "/createshoppingcart", component: CreateShoppingCart },
    { path: "/editshoppingcart/:id", component: EditShoppingCart, props: true },
  ],
});

export default router;

<template>
    <section class="hero is-dark">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">Home</router-link>
                <router-link class="navbar-item" to="/product">Product</router-link>
                <router-link class="navbar-item" to="/inventory">Inventory</router-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <!-- <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                <router-link class="navbar-item" to="/product">Product</router-link>
                <router-link class="navbar-item" to="/inventory">Inventory</router-link>
                </div>
            </div> -->
        </nav>
    </section>
    
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {}
</script>

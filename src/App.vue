<template>
  <div>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">Home</router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/product">Product</router-link>
          <router-link class="navbar-item" to="/inventory">Inventory</router-link>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container is-fluid">
        <router-view/>
      </div>
    </section>
  </div>
  <!-- <section class="section" id="app">
    <div class="container">
      <h1 class="title">Section</h1>
      <h2 class="subtitle">
        A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2>
    </div>
    <div id="nav">
      <router-link to="/">Inventory</router-link> |
      <router-link to="/product">Product</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="container">
      <div class="notification">
        This container is <strong>centered</strong> on desktop.
      </div>
    </div>
    <router-view/>
  </section> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import apps from "@/store/modules/apps";

@Component({
  components: {
  }
})
export default class App extends Vue {
  get getIsLoading() {
    return apps.getIsLoading;
  }
}
</script>

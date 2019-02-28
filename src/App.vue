<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Inventory</router-link> |
      <router-link to="/product">Product</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
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

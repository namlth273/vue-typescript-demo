<template>
  <div id="app">
    <ui-preloader :show="getIsLoading" class="sticky-top"></ui-preloader>
    <div id="nav">
      <router-link to="/">Inventory</router-link> |
      <router-link to="/product">Product</router-link>
    </div>
    <b-container fluid>
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UiPreloader from "keen-ui/src/UiPreloader.vue";
import apps from "@/store/modules/apps";

@Component({
  components: {
    UiPreloader
  }
})
export default class App extends Vue {
  get getIsLoading() {
    return apps.getIsLoading;
  }
}
</script>


<style lang="scss">
#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

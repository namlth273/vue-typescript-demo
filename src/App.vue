<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import apps from "@/store/modules/apps";

@Component
export default class App extends Vue {
  get getIsLoading() {
    return apps.getIsLoading;
  }
}
</script>

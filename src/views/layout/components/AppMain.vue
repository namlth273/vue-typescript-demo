<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AppMain extends Vue {}
</script>


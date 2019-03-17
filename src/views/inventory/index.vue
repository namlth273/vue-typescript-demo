<template>
  <section class="section section--mod">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <InventoryFilter></InventoryFilter>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <div class="box">
          <InventoryTable :filters="filters"></InventoryTable>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  IProduct,
  IEnumModel,
  IProductColor,
  IProductSize,
  ISeacchInventoryOption
} from "@/store/models";
import InventoryTable from "./_/InventoryTable.vue";
import InventoryFilter from "./_/InventoryFilter.vue";

@Component({
  components: {
    InventoryTable,
    InventoryFilter
  }
})
export default class About extends Vue {
  filters: ISeacchInventoryOption = {
    name: "",
    buyPrice: ""
  };
}
</script>

<style lang="scss">
.section--mod {
  background: lightpink;
}
</style>

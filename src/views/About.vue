<template>
  <section>
    <div class="level">
      <div class="level-item">
        <b-field label="Name" horizontal>
          <b-input type="number" placeholder="Buy price..." v-model="buyPrice"></b-input>
        </b-field>
      </div>
    </div>
    
    <b-table :data="getData"
      striped
      narrowed
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="description" label="Description">
          {{ props.row.description }}
        </b-table-column>
        <b-table-column field="quantity" label="Quantity">
          {{ props.row.quantity }}
        </b-table-column>
        <b-table-column field="buyPrice" label="Buy Price">
          ${{ props.row.buyPrice }}
        </b-table-column>
        <b-table-column field="createdDate" label="Date" centered>
          <span class="tag is-success">
              {{ new Date(props.row.createdDate).toLocaleDateString() }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import inventories from "@/store/modules/inventory";
import {
  IProduct, IEnumModel,
  IProductColor, IProductSize,
  ISeacchInventoryOption 
  } from "@/store/models";

@Component({
  components: {

  }
})
export default class About extends Vue {
  mounted() {
    this.$nextTick(() => {
      inventories.getAllInventory().then((res) => {
        inventories.searchInventory(this.filters);
      });
    });
  }

  buyPrice: number | null = null;
  filters: ISeacchInventoryOption = {
    name: "",
    buyPrice: ""
  };

  get getData() {
    return inventories.getFilteredInventories;
  }
}
</script>


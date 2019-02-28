<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-6 box">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Color</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select is-fullwidth">
                  <select>
                    <option>Business development</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b-field label="Size" horizontal>
          <div class="select">
            <select>
              <option>Select...</option>
              <option>With options</option>
            </select>
          </div>
        </b-field>
        <b-field label="Buy Price" horizontal>
          <b-input type="number" placeholder="Buy price..." v-model="buyPrice"></b-input>
        </b-field>
        <b-field label="Sell Price" horizontal>
          <b-input type="number" placeholder="Sell price..." v-model="sellPrice"></b-input>
        </b-field>
        <b-field label="Sort by" horizontal>
          <div class="select">
            <select>
              <option>Select...</option>
              <option>With options</option>
            </select>
          </div>
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
  sellPrice: number | null = null;
  filters: ISeacchInventoryOption = {
    name: "",
    buyPrice: ""
  };

  get getData() {
    return inventories.getFilteredInventories;
  }
}
</script>


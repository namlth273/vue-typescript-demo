<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Color</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select is-fullwidth">
              <ColorSelect></ColorSelect>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-field label="Size" horizontal>
      <div class="select">
        <SizeSelect></SizeSelect>
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Guid } from "guid-typescript";
import inventories from "../store";
import colors from "@/store/modules/color";
import sizes from "@/store/modules/size";
import {
  IProduct,
  IEnumModel,
  IProductColor,
  IProductSize,
  ISeacchInventoryOption
} from "@/store/models";
import ColorSelect from "./ColorSelect.vue";
import SizeSelect from "./SizeSelect.vue";

@Component({
  components: {
    ColorSelect,
    SizeSelect
  }
})
export default class InventoryFilter extends Vue {
  buyPrice: number | null = null;
  sellPrice: number | null = null;
  filters: ISeacchInventoryOption = {
    name: "",
    buyPrice: ""
  };
}
</script>

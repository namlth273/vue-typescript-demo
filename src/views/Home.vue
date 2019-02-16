<template>
  <div class="home">
    <div class="row">
      <div class="col-6">
        <ui-select class="mx-3"
          has-search
          placeholder="Select color..."
          :keys="{ label: 'description', value: 'id' }"
          :options="getColors"
          v-model="selectedColor">
          <!-- <template slot-scope="props" slot="option">
            <code>{{ props }}</code>
          </template> -->
        </ui-select>
      </div>
      <div class="col-6">
        <b-form-select v-model="selectedSize">
          <option :value="null" selected>Select Size</option>
          <option v-for="option in getSizes"
            :key="option.id"
            :value="option">
            {{option.description}}
          </option>
        </b-form-select>
      </div>
    </div>
    <div class="d-flex justify-content-center m-3">
        
      <!-- <b-form-select v-model="selectedColor" class="col-md-2 mx-3">
        <option :value="null" selected>Select Color</option>
        <option class="" v-for="option in getColors"
          :key="option.id"
          :value="option">
          {{option.description}}
        </option>
      </b-form-select> -->
      
    </div>
    <div class="d-flex justify-content-center m-3">
        <b-form-input id="txtBuyPrice" type="number" class="col-md-2 mx-3" placeholder="Buy price..." v-model="buyPrice"></b-form-input>
        <b-form-input id="`txtSellPrice" type="number" class="col-md-2 mx-3" placeholder="Sell price..." v-model="sellPrice"></b-form-input>
    </div>
    <div class="d-flex justify-content-center m-3">
        <input class="form-control col-md-2 mx-3" v-model="filters[`name`]" placeholder="Filter name..."/>
        <b-form-input id="`txtSellPrice" type="number" class="col-md-2 mx-3" placeholder="Filter buy price..." v-model="filters[`buyPrice`]"></b-form-input>
    </div>
    <div class="d-flex flex-column mx-3">
      <b-table striped hover :items="getProducts" :fields="productFields">
        <template slot="actions" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
          <ui-button color="primary" :loading="isBuyBtnLoading" @click.stop="buyProduct(row.item, row.index, $event.target)">
            <v-icon name="plus" class="mr-2"/>
            Buy
          </ui-button>
        </template>
      </b-table>
      <b-table hover :items="getFilteredInventories" :fields="fields">
        <template slot="actions" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
          <ui-button class="mx-2" color="primary" :loading="isBuyBtnLoading" @click.stop="buyProductInventory(row.item, row.index, $event.target)">
            <v-icon name="plus" class="mr-2"/>
            Buy
          </ui-button>
          <ui-button class="mx-2" color="primary" :loading="isSellBtnLoading" @click.stop="sellProductInventory(row.item, row.index, $event.target)">
            <v-icon name="dollar-sign" class="mr-2"/>
            Sell
          </ui-button>
          <!-- <button class="btn btn-primary" @click.stop="sellProductInventory(row.item, row.index, $event.target)" :disabled="!isSellBtnActive(row.item)">
              Sell
          </button> -->
        </template>
      </b-table>
      <b-pagination class="iot-module-paging"
        align="center"
        size="md"
        :total-rows="100"
        v-model="currentPage"
        :per-page="10"
        :limit="6"
        :first-text="`<i class='fas fa-angle-double-left'></i>`"
        :prev-text="`<i class='fas fa-angle-left'></i>`"
        :next-text="`<i class='fas fa-angle-right'></i>`"
        :last-text="`<i class='fas fa-angle-double-right'></i>`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Guid } from "guid-typescript";
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { IProduct, IEnumModel } from "@/store/models";
import products from "@/store/modules/products";
import colors from "@/store/modules/colors";
import sizes from "@/store/modules/sizes";
import "keen-ui/src/bootstrap";
import { UiButton, UiSelect } from "keen-ui/src";
import "@/scss/home.scss";

@Component({
  components: {
    HelloWorld,
    UiButton,
    UiSelect
  }
})
export default class Home extends Vue {
  selectedColor: IProduct = {} as IProduct;
  selectedSize: IEnumModel | null = null;
  buyPrice: number | null = null;
  sellPrice: number | null = null;
  filters = {
    name: "",
    buyPrice: "",
  }
  filterName: string | null = null;
  filterBuyPrice: number | null = null;
  currentPage: number = 1;

  get getSelectedColorId() {
    if (this.selectedColor)
      return this.selectedColor;
    return null;
  }

  get getSelectedSizeId() {
    if (this.selectedSize)
      return this.selectedSize.id;
    return null;
  }

  productFields = [
    { key: "name", label: "Name", sortable: true, sortDirection: "desc" },
    { key: "description", label: "Description", sortable: true, "class": "text-center" },
    { key: "actions", label: "Actions" }
  ];

  fields = [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description", sortable: true, "class": "text-center" },
    { key: "quantity", label: "Quantity" },
    { key: "color", label: "Color" },
    { key: "size", label: "Size" },
    { key: "buyPrice", label: "Buy Price" },
    { key: "sellPrice", label: "Sell Price" },
    { key: "actions", label: "Actions" }
  ];
  isBuyBtnLoading: boolean = false;
  isSellBtnLoading: boolean = false;

  mounted() {
    this.$nextTick(() => {
      sizes.getAll();
      colors.getAll();
      products.getAll();
      products.getAllInventory();
    });

    console.log(this.filters["name"]);
  }

  get getColors(): Array<IEnumModel> {
    const result = colors.getColors;

    if(!result) {
      return new Array<IEnumModel>();
    }

    return result;
  }

  get getSizes(): Array<IEnumModel> {
    const result = sizes.getSizes;

    if(!result) {
      return new Array<IEnumModel>();
    }

    return result;
  }

  get getProducts(): Array<IProduct> {
    const result = products.getProducts;

    if(!result) {
      return new Array<IProduct>();
    }

    return result;
  }

  get getFilteredInventories(): Array<IProduct> {
    const filtered = this.getProductInventories.filter(item => {
      return Object.keys(this.filters).every(key =>
      {
        return String(item[key]).toLowerCase().includes(this.filters[key].toLowerCase())
      }
    )});
    return filtered.length > 0 ? filtered : [];
  }

  get getProductInventories(): Array<IProduct> {
    const result = products.getProductInventories;

    if(!result) {
      return new Array<IProduct>();
    }

    return result;
  }

  isSellBtnActive(item: IProduct) {
    return item.quantity > 0 && !this.isSellBtnLoading;
  }

  buyProduct(item: IProduct, index: number, button: Element) {
    this.isBuyBtnLoading = true;
    products.buy({
      productId: item.id,
      quantity: 1,
      buyPrice: this.buyPrice,
      sellPrice: this.sellPrice,
      productColorId: this.getSelectedColorId,
      productSizeId: this.getSelectedSizeId,
    }).then((res) => {
      console.log("Buy Ok");
      this.isBuyBtnLoading = false;
    })
  }

  buyProductInventory(item: IProduct, index: number, button: Element) {
    this.isBuyBtnLoading = true;
    products.buyInventory({
      productId: item.id,
      quantity: 1,
      buyPrice: item.buyPrice,
      sellPrice: item.sellPrice,
      productColorId: item.productColorId,
      productSizeId: item.productSizeId,
    }).then((res) => {
      console.log("Buy Ok");
      this.isBuyBtnLoading = false;
    })
  }

  sellProductInventory(item: IProduct, index: number, button: Element) {
    this.isSellBtnLoading = true;

    products.sellInventory({
      productId: item.id,
      quantity: 1,
      productColorId: item.productColorId,
      productSizeId: item.productSizeId,
    }).then((res) => {
      console.log("Sell Ok");
      this.isSellBtnLoading = false;
    })
  }
}
</script>

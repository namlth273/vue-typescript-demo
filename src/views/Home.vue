<template>
  <div class="home">
    <div class="d-flex justify-content-center m-3">
      <b-form-select v-model="selectedColor" class="col-md-2 mx-3">
        <option :value="null" selected>Select Color</option>
        <option class="" v-for="option in getColors"
          :key="option.id"
          :value="option">
          {{option.description}}
        </option>
      </b-form-select>
      <b-form-select v-model="selectedSize" class="col-md-2 mx-3">
        <option :value="null" selected>Select Size</option>
        <option v-for="option in getSizes"
          :key="option.id"
          :value="option">
          {{option.description}}
        </option>
      </b-form-select>
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
          <button class="btn btn-primary mx-3" @click.stop="buyProduct(row.item, row.index, $event.target)" :disabled="isBuyBtnDisabled">
              Buy
          </button>
        </template>
      </b-table>
      <b-table striped hover :items="getFilteredInventories" :fields="fields">
        <template slot="actions" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
          <button class="btn btn-primary mx-3" @click.stop="buyProductInventory(row.item, row.index, $event.target)" :disabled="isBuyBtnDisabled">
              Buy
          </button>
          <button class="btn btn-primary" @click.stop="sellProductInventory(row.item, row.index, $event.target)" :disabled="!isSellBtnActive(row.item)">
              Sell
          </button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { IProduct, IEnumModel } from "@/store/models";
import products from "@/store/modules/products";
import colors from "@/store/modules/colors";
import sizes from "@/store/modules/sizes";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  selectedColor: IEnumModel | null = null;
  selectedSize: IEnumModel | null = null;
  buyPrice: number | null = null;
  sellPrice: number | null = null;
  filters = {
    name: "",
    buyPrice: "",
  }
  filterName: string | null = null;
  filterBuyPrice: number | null = null;

  get getSelectedColorId() {
    if (this.selectedColor)
      return this.selectedColor.id;
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
    { key: "name", label: "Name", sortable: true, sortDirection: "desc" },
    { key: "description", label: "Description", sortable: true, "class": "text-center" },
    { key: "quantity", label: "Quantity" },
    { key: "color", label: "Color" },
    { key: "size", label: "Size" },
    { key: "buyPrice", label: "Buy Price" },
    { key: "sellPrice", label: "Sell Price" },
    { key: "actions", label: "Actions" }
  ];
  isHomeBtnDisabled: boolean = false;
  isBuyBtnDisabled: boolean = false;
  isSellBtnDisabled: boolean = false;

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
    return item.quantity > 0 && !this.isSellBtnDisabled;
  }

  buyProduct(item: IProduct, index: number, button: Element) {
    this.isBuyBtnDisabled = true;
    products.buy({
      productId: item.id,
      quantity: 1,
      buyPrice: this.buyPrice,
      sellPrice: this.sellPrice,
      productColorId: this.getSelectedColorId,
      productSizeId: this.getSelectedSizeId,
    }).then((res) => {
      console.log("Buy Ok");
      this.isBuyBtnDisabled = false;
    })
  }

  buyProductInventory(item: IProduct, index: number, button: Element) {
    this.isBuyBtnDisabled = true;
    products.buyInventory({
      productId: item.id,
      quantity: 1,
      buyPrice: item.buyPrice,
      sellPrice: item.sellPrice,
      productColorId: item.productColorId,
      productSizeId: item.productSizeId,
    }).then((res) => {
      console.log("Buy Ok");
      this.isBuyBtnDisabled = false;
    })
  }

  sellProductInventory(item: IProduct, index: number, button: Element) {
    this.isSellBtnDisabled = true;

    products.sellInventory({
      productId: item.id,
      quantity: 1,
      productColorId: item.productColorId,
      productSizeId: item.productSizeId,
    }).then((res) => {
      console.log("Sell Ok");
      this.isSellBtnDisabled = false;
    })
  }
}
</script>

<template>
  <div class="home">
    <button class="btn btn-primary" :disabled="isHomeBtnDisabled">Hello</button>
    <button class="btn btn-primary m-3">
      <i class="fas fa-home"></i>
      Home
    </button>
    <p>{{selectedColor}}</p>
    <p>{{selectedSize}}</p>
    <b-dropdown id="ddlColor"
                name="ddlColor"
                v-model="selectedColor"
                text="Select Item"
                variant="primary"
                class="m-md-2 mx-3">
        <!-- <b-dropdown-item disabled value="0">Select an Item</b-dropdown-item> -->
        <b-dropdown-item v-for="option in getColors"
          @click="selectedColor = option"
          :key="option.id"
          :value="option.id">{{option.description}}</b-dropdown-item>           
    </b-dropdown>
    <b-dropdown id="ddlSize"
                name="ddlSize"
                v-model="selectedSize"
                text="Select Item"
                variant="primary"
                class="m-md-2">
        <!-- <b-dropdown-item disabled value="0">Select an Item</b-dropdown-item> -->
        <b-dropdown-item v-for="option in getSizes"
          @click="selectedSize = option"
          :key="option.id"
          :value="option.id">{{option.description}}</b-dropdown-item>           
    </b-dropdown>
    <b-table striped hover :items="getProducts" :fields="fields">
      <template slot="actions" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
        <button class="btn btn-primary mx-3" @click.stop="buyProduct(row.item, row.index, $event.target)" :disabled="isBuyBtnDisabled">
            Buy
        </button>
        <button class="btn btn-primary" @click.stop="sellProduct(row.item, row.index, $event.target)" :disabled="!isSellBtnActive(row.item)">
            Sell
        </button>
      </template>
    </b-table>
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

  fields = [
    { key: "name", label: "Product Name", sortable: true, sortDirection: "desc" },
    { key: "description", label: "Product Description", sortable: true, "class": "text-center" },
    { key: "quantity", label: "Quantity" },
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
    });
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

  isSellBtnActive(item: IProduct) {
    return item.quantity > 0 && !this.isSellBtnDisabled;
  }

  buyProduct(item: IProduct, index: number, button: Element) {
    this.isBuyBtnDisabled = true;
    products.buy({
      productId: item.id,
      quantity: 1
    }).then((res) => {
      console.log("Buy Ok");
      this.isBuyBtnDisabled = false;
    })
  }

  sellProduct(item: IProduct, index: number, button: Element) {
    this.isSellBtnDisabled = true;

    products.sell({
      productId: item.id,
      quantity: 1
    }).then((res) => {
      console.log("Sell Ok");
      this.isSellBtnDisabled = false;
    })
  }
}
</script>

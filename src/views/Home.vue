<template>
  <div class="home">
    <button class="btn btn-primary" @click="homeClick" :disabled="isHomeBtnDisabled">Hello</button>
    <button class="btn btn-primary m-3" @click="click">
      <i class="fas fa-home"></i>
      Home
    </button>
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
import { IProduct } from "@/store/models";
import products from "@/store/modules/products";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  products: IProduct[] | null = [];
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
      this.loadAll();
    });
  }

  get getProducts(): Array<IProduct> {
    const result = products.getProducts;

    if(!result) {
      return new Array<IProduct>();
    }

    return result;
  }

  click() {
    this.products = [];
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

  homeClick() {
    this.isHomeBtnDisabled = true;
    this.loadAll();
    setTimeout(() => this.isHomeBtnDisabled = false, 1000);
  }

  loadAll() {
    products.getAll();
  }
}
</script>

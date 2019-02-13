<template>
  <div class="home">
    <button class="btn btn-primary" @click="homeClick" :disabled="isHomeBtnDisabled">Hello</button>
    <button class="btn btn-primary m-3" @click="click">
      <i class="fas fa-home"></i>
      Home
    </button>
    <b-table striped hover :items="products" :fields="fields"></b-table>
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
  fields = [ "name", "description", "quantity" ];
  isHomeBtnDisabled: boolean = false;

  mounted() {
    this.$nextTick(() => {
      this.loadAll();
    });
  }

  click() {
    this.products = [];
  }

  homeClick() {
    this.isHomeBtnDisabled = true;
    this.loadAll();
    setTimeout(() => this.isHomeBtnDisabled = false, 1000);
  }

  loadAll() {
    products.getAll().then((res) => {
        this.products = products.products;
    });
  }
}
</script>

<template>
  <div class="home">
    <b-row class="my-3">
      <b-col>
        <b-button primary v-b-modal.modal1>Launch demo modal</b-button>
        <b-modal id="modal1" title="Product List" lazy>
          <b-container fluid>
            <b-row>
              <b-col>
                <ui-select class=""
                  has-search
                  :loading="selectProductLoading"
                  disable-filter
                  @query-change="onQueryChangeProductSelection"
                  placeholder="Select product..."
                  :keys="{ label: 'description', value: 'id' }"
                  :options="getProductsSelection"
                  v-model="selectedProduct">
                  <template slot-scope="props" slot="option">
                    {{ `${props.option.name} (${props.option.quantity}) (${props.option.color}) (${props.option.size})` }}
                  </template>
                </ui-select>
              </b-col>
            </b-row>
          </b-container>
        </b-modal>
      </b-col>
    </b-row>
    <div class="row">
      <div class="col-12 col-md-4 offset-md-2">
        <ColorSelection></ColorSelection>
      </div>
      <div class="col-12 col-md-4">
        <SizeSelection></SizeSelection>
        <!-- <b-form-select v-model="selectedSize">
          <option :value="null" selected>Select Size</option>
          <option v-for="option in getSizes"
            :key="option.id"
            :value="option">
            {{option.description}}
          </option>
        </b-form-select> -->
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-4 offset-2">
        <b-form-input id="txtBuyPrice" type="number" placeholder="Buy price..." v-model="buyPrice"></b-form-input>
      </div>
      <div class="col-4">
        <b-form-input id="`txtSellPrice" type="number" placeholder="Sell price..." v-model="sellPrice"></b-form-input>
      </div>
    </div>
    <div class="d-flex justify-content-center">
        
      <!-- <b-form-select v-model="selectedColor" class="col-md-2 mx-3">
        <option :value="null" selected>Select Color</option>
        <option class="" v-for="option in getColors"
          :key="option.id"
          :value="option">
          {{option.description}}
        </option>
      </b-form-select> -->
      
    </div>
    <div class="row mb-3">
      <div class="col-12 col-md-4 offset-md-2">
        <input class="form-control" v-model="filters[`name`]" placeholder="Filter name..."/>
      </div>
      <div class="col-12 col-md-4">
        <b-form-input id="`txtSellPrice" type="number" placeholder="Filter buy price..." v-model="filters[`buyPrice`]"></b-form-input>
      </div>
    </div>
    <div class="d-flex flex-column mx-3">
      <b-table striped hover :items="getProducts" :fields="productFields">
        <template slot="actions" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
          <ui-button color="primary" :loading="isBuyBtnLoading" @click.stop="buyProduct(row.item, row.index, $event.target)">
            <!-- <v-icon name="plus" class="mr-2"/> -->
            Buy
          </ui-button>
        </template>
      </b-table>
      <b-table hover :items="getFilteredInventories" :fields="fields" :perPage="getItemsPerPage" :currentPage="getCurrentPage">
        <template slot="actions" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
          <ui-button class="mx-2" color="primary" :loading="isBuyBtnLoading" @click.stop="buyProductInventory(row.item, row.index, $event.target)">
            <!-- <v-icon name="plus" class="mr-2"/> -->
            Buy
          </ui-button>
          <ui-button class="mx-2" color="primary" :loading="isSellBtnLoading" @click.stop="sellProductInventory(row.item, row.index, $event.target)">
            <!-- <v-icon name="dollar-sign" class="mr-2"/> -->
            Sell
          </ui-button>
          <!-- <button class="btn btn-primary" @click.stop="sellProductInventory(row.item, row.index, $event.target)" :disabled="!isSellBtnActive(row.item)">
              Sell
          </button> -->
        </template>
      </b-table>
      <IotModulesPagination></IotModulesPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Guid } from "guid-typescript";
import { Component, Vue } from "vue-property-decorator";
import IotModulesPagination from "@/components/iot-modules-pagination.vue";
import { IProduct, IEnumModel, IProductColor, IProductSize } from "@/store/models";
import products from "@/store/modules/products";
import colors from "@/store/modules/colors";
import sizes from "@/store/modules/sizes";
import "keen-ui/src/bootstrap";
import UiButton from "keen-ui/src/UiButton.vue";
import UiSelect from "keen-ui/src/UiSelect.vue";
import { debounce } from "ts-debounce";
import ColorSelection from "@/components/color-selection.vue";
import SizeSelection from "@/components/size-selection.vue";
import "@/scss/home.scss";

@Component({
  components: {
    IotModulesPagination,
    ColorSelection,
    SizeSelection,
    UiButton,
    UiSelect
  }
})
export default class Home extends Vue {
  selectedProduct: IProduct = {} as IProduct;
  buyPrice: number | null = null;
  sellPrice: number | null = null;
  filters = {
    name: "",
    buyPrice: "",
  }
  filtersProductSelection = {
    name: "",
    color: "",
    size: "",
    quantity: "",
    description: ""
  }
  productsSelection: IProduct[] = [];

  get getItemsPerPage() {
    return products.getItemsPerPage;
  }

  get getCurrentPage() {
    return products.getCurrentPage;
  }

  get getSelectedColor() {
    return colors.getSelectedColor;
  }

  get getSelectedSize() {
    return sizes.getSelectedSize;
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
  selectProductLoading: boolean = false;

  created() {
    this.search = debounce((query) => {
      const filtered = this.getProductInventories.filter(item => {
        return Object.keys(this.filtersProductSelection).some(key =>
        {
          return String(item[key]).toLowerCase().includes(query.toLowerCase());
        }
      )});

      this.productsSelection = filtered;

      this.selectProductLoading = false;
    }, 1000);
  }

  mounted() {
    this.$nextTick(() => {
      sizes.getAll();
      colors.getAll();
      products.getAll();
      products.getAllInventory();
      this.productsSelection = this.getProductInventories;
    });

    console.log(this.filters["name"]);
  }

  search(query: string) { return; };

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

  get getProductsSelection(): Array<IProduct> {
    return this.productsSelection;
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
      productColorId: this.getSelectedColor.id,
      productSizeId: this.getSelectedSize.id,
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

  onQueryChangeProductSelection(query) {
    if (query.length === 0) {
        return;
    }
    
    const that = this;
    that.selectProductLoading = true;

    this.search(query);
  }
}
</script>

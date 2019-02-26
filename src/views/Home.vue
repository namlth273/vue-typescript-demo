<template>
  <div class="container-fluid home">
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
      <div class="col-12 col-md-4 offset-md-2 input-with-progress">
        <input class="form-control" v-model="filters[`name`]" placeholder="Filter name..." @input="filterNameInput"/>
        <ui-progress-circular
          :stroke="1"
          color="primary"
          type="indeterminate"
          v-show="isFilterNameLoading"
        ></ui-progress-circular>
      </div>
      <div class="col-12 col-md-4">
        <b-form-input id="`txtSellPrice" type="number" placeholder="Filter buy price..." v-model="filters[`buyPrice`]"></b-form-input>
      </div>
    </div>
    <b-row class="mb-3">
      <b-col cols="4" offset="2">
        <b-form-select v-model="sortBy">
          <option :value="null" selected>Sort by...</option>
          <option v-for="option in getSortOptions"
            :key="option.value"
            :value="option.value">
            {{option.text}}
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="4">

      </b-col>
    </b-row>
    <h2>{{totalRows}}</h2>
    <b-row>
      <b-col>
        <b-table striped hover :items="getProducts" :fields="productFields"
          :perPage="perPage"
          :currentPage="currentPage"
          responsive
        >
          <template slot="actions" slot-scope="row">
            <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
            <ui-button color="primary" :loading="isBuyBtnLoading" @click.stop="buyProduct(row.item, row.index, $event.target)">
              <v-icon name="plus"/>
            </ui-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-pagination
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ui-button color="primary" v-b-modal.modal2 class="mb-3">
            Filter Columns
        </ui-button>
        <b-modal id="modal2" title="Filter Columns" size="xl" lazy>
          <b-container fluid>
            <b-row>
              <b-col>
                <FilterOption></FilterOption>
              </b-col>
            </b-row>
          </b-container>
        </b-modal>
      </b-col>
    </b-row>
    <FilterOption></FilterOption>
    <h2>{{getTotalItemsCount}}</h2>
    <b-row>
      <b-col>
        <b-table hover :items="getFilteredInventories"
          :fields="inventoryFields"
          :perPage="getItemsPerPage"
          :currentPage="getCurrentPage"
          :sort-by.sync="sortBy"
          responsive
        >
          <template slot="isDeleted" slot-scope="row">
            <div class="d-flex justify-content-center">
              <ui-checkbox v-model="row.item.isDeleted" disabled></ui-checkbox>
            </div>
          </template>
          <template slot="createdDate" slot-scope="row">
            <div class="d-flex justify-content-center">
              <span>{{row.item.createdDate | formatDate}}</span>
            </div>
          </template>
          <template slot="actions" slot-scope="row">
            <div class="d-flex no-wrap justitfy-content-center align-items-center">
              <!-- we use @click.stop here to prevent emitting of a "row-clicked" event  -->
              <ui-button class="mx-2" color="primary"
                :loading="isBuyBtnLoading"
                @click.stop="buyProductInventory(row.item, row.index, $event.target)">
                <v-icon name="plus"/>
              </ui-button>
              <ui-button class="mx-2" color="primary"
                :loading="isSellBtnLoading"
                @click.stop="sellProductInventory(row.item, row.index, $event.target)">
                <v-icon name="dollar-sign"/>
              </ui-button>
              <!-- <button class="btn btn-primary" @click.stop="sellProductInventory(row.item, row.index, $event.target)" :disabled="!isSellBtnActive(row.item)">
                  Sell
              </button> -->
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <IotModulesPagination></IotModulesPagination>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { IProduct, IEnumModel, IProductColor, IProductSize, ISeacchInventoryOption } from "@/store/models";
import IotModulesPagination from "@/components/iot-modules-pagination.vue";
import FilterOption from "@/components/filterOption/filter-option.vue";
import { Guid } from "guid-typescript";
import products from "@/store/modules/product";
import inventories from "@/store/modules/inventory";
import colors from "@/store/modules/color";
import sizes from "@/store/modules/size";
import "keen-ui/src/bootstrap";
import UiButton from "keen-ui/src/UiButton.vue";
import UiSelect from "keen-ui/src/UiSelect.vue";
import UiCheckbox from "keen-ui/src/UiCheckbox.vue";
import UiProgressCircular from "keen-ui/src/UiProgressCircular.vue";
import { debounce } from "ts-debounce";
import ColorSelection from "@/components/color-selection.vue";
import SizeSelection from "@/components/size-selection.vue";
import moment from "moment";
import "@/scss/home.scss";

@Component({
  components: {
    IotModulesPagination,
    FilterOption,
    ColorSelection,
    SizeSelection,
    UiButton,
    UiSelect,
    UiCheckbox,
    UiProgressCircular
  },
  filters: {
    formatDate: (value): string => {
      if (!value) return "";
      return moment.utc(value).local().format("MM/DD/YYYY HH:MM:SS");
    }
  }
})
export default class Home extends Vue {
  isBuyBtnLoading: boolean = false;
  isSellBtnLoading: boolean = false;
  selectProductLoading: boolean = false;
  isFilterNameLoading: boolean = false;
  sortBy: string | null = null;
  selectedProduct: IProduct = {} as IProduct;
  productsSelection: IProduct[] = [];
  buyPrice: number | null = null;
  sellPrice: number | null = null;
  perPage: number = 3;
  currentPage: number = 1;
  filters: ISeacchInventoryOption = {
    name: "",
    buyPrice: ""
  };
  filtersProductSelection = {
    name: "",
    color: "",
    size: "",
    quantity: "",
    description: ""
  };

  productFields = [
    { key: "name", label: "Name", sortable: true, sortDirection: "desc" },
    { key: "description", label: "Description", sortable: true, "class": "text-center" },
    { key: "actions", label: "Buy" }
  ];

  inventoryFields = [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description", sortable: true, "class": "text-center" },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "color", label: "Color" },
    { key: "size", label: "Size" },
    { key: "buyPrice", label: "Buy Price" },
    { key: "sellPrice", label: "Sell Price" },
    { key: "isDeleted", label: "Is Deleted" },
    { key: "createdDate", label: "Created Date" },
    { key: "actions", label: "Buy/Sell", "class": "d-flex justify-content-center align-items-center flex-column" }
  ];

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

    const filterNameDebounce = debounce((e) => {
      this.filters["name"] = e.target.value;
      inventories.searchInventory(this.filters)
        .then(() => this.isFilterNameLoading = false);
    }, 1000);

    this.filterNameInput = (e) => {
      this.isFilterNameLoading = true;
      filterNameDebounce(e);
    }
  }

  mounted() {
    this.$nextTick(() => {
      sizes.getAll();
      colors.getAll();
      products.getAll();
      inventories.getAllInventory().then((res) => {
        inventories.searchInventory(this.filters);
      });
    });
  }

  search(query: string) { return; }

  filterNameInput(query) { return; }

  get totalRows() {
    return products.getProducts.length;
  }

  get getItemsPerPage() {
    return inventories.getItemsPerPage;
  }

  get getCurrentPage() {
    return inventories.getCurrentPage;
  }

  get getTotalItemsCount() {
    return inventories.getFilteredInventories.length;
  }

  get getSelectedColor() {
    return colors.getSelectedColor;
  }

  get getSelectedSize() {
    return sizes.getSelectedSize;
  }

  get getInventoryFilterOption() {
    return inventories.getInventoryFilterOption;
  }

  get getSortOptions() {
    return this.inventoryFields
      .filter(f => f.sortable)
      .map(f => {
        return { text: f.label, value: f.key }
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

  get getFilteredInventories(): Array<IProduct> {
    return inventories.getFilteredInventories;
    // const filtered = this.getProductInventories.filter(item => {
    //   return Object.keys(this.filters).every(key =>
    //   {
    //     return String(item[key]).toLowerCase().includes(this.filters[key].toLowerCase())
    //   }
    // )});
    // return filtered.length > 0 ? filtered : [];
  }

  get getProductInventories(): Array<IProduct> {
    const result = inventories.getProductInventories;

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
    this.buyProductAsync(item).then((res) => {
      console.log("Buy Ok");
      this.isBuyBtnLoading = false;
    });
  }

  async buyProductAsync(item: IProduct) {
    await inventories.buyInventory({
      productId: item.id,
      quantity: 1,
      buyPrice: this.buyPrice,
      sellPrice: this.sellPrice,
      productColorId: this.getSelectedColor.id,
      productSizeId: this.getSelectedSize.id,
    });

    // await inventories.searchInventory(this.filters);
    await inventories.searchInventoryDynamic();
  }

  buyProductInventory(item: IProduct, index: number, button: Element) {
    this.isBuyBtnLoading = true;
    this.buyProductInventoryAsync(item).then(() => {
      console.log("Buy Ok");
      this.isBuyBtnLoading = false;
    });
  }

  async buyProductInventoryAsync(item: IProduct) {
    await inventories.buyInventory({
      productId: item.id,
      quantity: 1,
      buyPrice: item.buyPrice,
      sellPrice: item.sellPrice,
      productColorId: item.productColorId,
      productSizeId: item.productSizeId,
    });

    // await inventories.searchInventory(this.filters);
    await inventories.searchInventoryDynamic();
  }

  sellProductInventory(item: IProduct, index: number, button: Element) {
    this.isSellBtnLoading = true;

    this.sellProductInventoryAsync(item).then((res) => {
      console.log("Sell Ok");
      this.isSellBtnLoading = false;
    });
  }

  async sellProductInventoryAsync(item: IProduct) {
    await inventories.sellInventory({
      productId: item.id,
      quantity: 1,
      productColorId: item.productColorId,
      productSizeId: item.productSizeId,
    });

    // await inventories.searchInventory(this.filters);
    await inventories.searchInventoryDynamic();
  }

  onQueryChangeProductSelection(query) {
    if (query.length === 0) {
        return;
    }
    
    this.selectProductLoading = true;

    this.search(query);
  }
}
</script>

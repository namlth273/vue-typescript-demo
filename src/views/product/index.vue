<template>
    <div>
        <section class="section section--mod">
            <div class="columns">
                <div class="column is-12">
                    <div class="box">
                        <ProductFilter></ProductFilter>
                    </div>
                </div>
            </div>
            <b-collapse
                aria-id="contentProductAddForm"
                :open.sync="isProductAddFormOpen">
                <div class="columns">
                    <div class="column is-12">
                        <div class="box">
                            <ProductAddForm @added="added"></ProductAddForm>
                        </div>
                    </div>
                </div>
            </b-collapse>
            <b-collapse
                aria-id="contentProductForm"
                :open.sync="isProductFormOpen">
                <div class="columns">
                    <div class="column is-12">
                        <div class="box">
                            <ProductForm :modelProduct="getProduct" @clear="clear" @saved="saved"></ProductForm>
                        </div>
                    </div>
                </div>
            </b-collapse>
            <div class="columns">
                <div class="column is-12">
                    <button
                        class="button is-info"
                        @click="isProductAddFormOpen = !isProductAddFormOpen"
                        aria-controls="contentProductAddForm">
                        Add
                    </button>
                </div>
            </div>
            <div class="columns">
                <div class="column is-12">
                    <div class="box">
                        <ProductTable></ProductTable>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProduct, ISaveProduct } from "@/store/models";
import products from "./store";
import ProductTable from "./_/ProductTable.vue";
import ProductFilter from "./_/ProductFilter.vue";
import ProductForm from "./_/ProductForm.vue";
import ProductAddForm from "./_/ProductAddForm.vue";

@Component({
    components: {
        ProductTable,
        ProductFilter,
        ProductForm,
        ProductAddForm
    }
})
export default class Product extends Vue {
    isProductAddFormOpen: boolean = false;

    get isProductFormOpen(): boolean {
        return products.selectedProduct != null;
    }

    get getProduct(): IProduct {
        return Object.assign({}, products.selectedProduct);
    }

    clear() {
        products.setSelectedProduct(null);
    }

    added() {
        products.search();
        this.isProductAddFormOpen = !this.isProductAddFormOpen;
    }

    saved() {
        products.search();
        this.clear();
    }
    
    // btnAddText: string = "Add";
    // isBtnAddProductLoading = false;
    // product: ISaveProduct = {} as ISaveProduct;
    // perPage: number = 3;
    // currentPage: number = 1;
    // productFields = [
    //     { key: "name", label: "Name", sortable: true, sortDirection: "desc" },
    //     { key: "description", label: "Description", sortable: true, "class": "text-center" },
    //     { key: "actions", label: "" }
    // ];
    // get getProducts() {
    //     return products.getProducts;
    // }
    // get totalRows() {
    //     return products.getProducts.length;
    // }
    // saveProduct(): void {
    //     this.btnAddText = "Add";
    //     this.isBtnAddProductLoading = true;
    //     products.saveProduct(this.product).then(() => {
    //         this.product = {} as ISaveProduct;
    //         this.isBtnAddProductLoading = false;
    //     });
    // }
    // editProduct(item: IProduct): void {
    //     this.btnAddText = "Update";
    //     this.product = {
    //         id: item.id,
    //         name: item.name,
    //         description: item.description
    //     };
    // }
}
</script>

<template>
    <!-- <b-container fluid>
        <b-row>
            <b-col md="6" offset="3">
                <div class="form-group">
                    <input type="text" class="form-control" name="name" v-validate="'required'" v-model="product['name']" placeholder="Enter name..."/>
                    <span class="text-left invalid-feedback" v-for="error in veeErrors.collect('name')" :key="error.id">{{ error }}</span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" offset="3">
                <div class="form-group">
                    <input type="text" class="form-control" name="description" v-validate="'required'" v-model="product['description']" placeholder="Enter description..."/>
                    <span class="text-left invalid-feedback" v-for="error in veeErrors.collect('description')" :key="error.id">{{ error }}</span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div class="form-group">
                    <ui-button ref="btnAdd" color="primary"
                        :loading="isBtnAddProductLoading"
                        @click.stop="saveProduct">
                        <v-icon name="plus" class="mr-2"/>
                        {{btnAddText}}
                    </ui-button>
                </div>
            </b-col>
        </b-row>
        <h2>{{totalRows}}</h2>
        <b-row>
            <b-col class="">
                <b-table striped hover :items="getProducts" :fields="productFields"
                    :perPage="perPage"
                    :currentPage="currentPage"
                >
                    <template slot="actions" slot-scope="row">
                        <ui-button color="info" @click.stop="editProduct(row.item)">
                            <v-icon name="pen"/>
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
    </b-container>-->
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
                aria-id="contentProductForm"
                :open.sync="isProductFormOpen">
                <div class="columns">
                    <div class="column is-12">
                        <div class="box">
                            <ProductForm :modelProduct="getProduct" @clear="clear"></ProductForm>
                        </div>
                    </div>
                </div>
            </b-collapse>
            <div class="columns">
                <div class="column is-12">
                    <button
                        class="button is-info"
                        @click="isProductFormOpen = !isProductFormOpen"
                        aria-controls="contentProductForm">
                        Add/Edit
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

@Component({
    components: {
        ProductTable,
        ProductFilter,
        ProductForm
    }
})
export default class Product extends Vue {
    // isProductFormOpen: boolean = false;

    get isProductFormOpen(): boolean {
        return products.selectedProduct != null;
    }

    get getProduct(): IProduct {
        return Object.assign({}, products.selectedProduct);
    }

    clear() {
        products.setSelectedProduct(null);
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

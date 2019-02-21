<template>
<b-container fluid class="content">
    <b-row>
        <b-col>
            <div class="content-title">Management of IoT Module</div>
            <b-row>
                <b-col class="content-detail">
                    <b-row class="content-detail-title">List of Transactionnaire with IoT Service</b-row>
                    <b-row class="section-filter">
                        <div class="form-group">
                            <div class="form-inline mr-3">
                                <label class="form-text mr-3">
                                    Order by:
                                </label>
                                <b-form-select :options="orderByItems" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-inline">
                                <label class="form-text mr-3">
                                    Search by Transactionnaire:
                                </label>
                                <div class="input-group">
                                    <button class="input-group-prepend input-group-search-btn">
                                        <i class="fa fa-search"></i>
                                    </button>
                                    <input class="input-group-search-text" placeholder="Search input" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group ml-auto">
                            <button class="btn btn-primary btn-add-new-iot">
                                <i class="fas fa-home"></i>
                                Add new IoT Module
                            </button>
                        </div>
                    </b-row>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    <b-row>
        <b-col cols="12">
        <b-table hover :items="transactionItems" :fields="productFields">
            <template slot="actions" slot-scope="row">
            <i class="fa fa-pen" @click.stop="rowClick(row.item, row.index, $event.target)"></i>
            </template>
        </b-table>
        </b-col>
    </b-row>
</b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProduct, IEnumModel, IProductColor, IProductSize } from "@/store/models";
import products from "@/store/modules/product";
import { IIotModule } from "@/store/models";

@Component
export default class IoTModule extends Vue {
productFields = [
{ key: "transaction", label: "Transactionaire", "class": "text-left" },
{ key: "name", label: "Transactionaire Name", "class": "text-left" },
{ key: "lastConnection", label: "Last Connection", "class": "text-left" },
{ key: "actions", label: "" }
];

orderByItems: Array<string> = [
"Transactionnaire",
"Transactionnaire Name",
"Last connection"
]
transactionItems = new Array<IIotModule>(
    {
        transaction: "010100",
        name: "ABC",
        lastConnection: "Today"
    },
    {
        transaction: "010102",
        name: "ABCD",
        lastConnection: "October 29"
    },
    {
        transaction: "010103",
        name: "ABCEF",
        lastConnection: "May 10"
    },
    {
        transaction: "010103",
        name: "ABCEF",
        lastConnection: "May 10"
    },
    {
        transaction: "010103",
        name: "ABCEF",
        lastConnection: "May 10"
    },
    {
        transaction: "010103",
        name: "ABCEF",
        lastConnection: "May 10"
    },
    {
        transaction: "010103",
        name: "ABCEF",
        lastConnection: "May 10"
    }
);
selectedProduct: IProduct | null = null;

get getProducts(): Array<IProduct> {
    return products.getProducts;
}

rowClick(item: IIotModule, index: number, button: Element) {
console.log(item);
}
}
</script>

<style lang="scss">
$content-detail-padding-left-right: 1.5rem;
$input-border-color: #ced4da;

.content-detail {
    margin-left: 1rem;
    margin-right: 1rem;
}

.content-detail-title {
    height: 60px;
    border-bottom: 1px solid #E4E4E4;
    padding-left: $content-detail-padding-left-right;
    padding-right: $content-detail-padding-left-right;
    justify-content: flex-start;
    align-items: center;
}

.section-filter {
    padding-left: $content-detail-padding-left-right;
    padding-right: $content-detail-padding-left-right;
    align-items: center;
    min-height: 60px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #F2F2F2;
}

.btn-add-new-iot {
    background-color: #7F7EFF;
}

.input-group-search-text {
    display: block;
    padding: 0.375rem 0.75rem 0.375rem 2.1rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid $input-border-color;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-group-search-text:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.input-group-search-btn {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    background: transparent;
    border: hidden;
    transform: translateY(-50%);
    color: #999999;
}

.input-group-search-btn:focus {
    outline-color: transparent;
}
</style>

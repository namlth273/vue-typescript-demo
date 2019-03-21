<template>
    <b-table :data="getData" striped narrowed>
        <template slot-scope="props">
            <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
            <b-table-column field="description" label="Description">{{ props.row.description }}</b-table-column>
            <b-table-column field="quantity" label="Quantity">{{ props.row.quantity }}</b-table-column>
            <b-table-column field="color" label="Color">{{ props.row.color }}</b-table-column>
            <b-table-column field="size" label="Size">{{ props.row.size }}</b-table-column>
            <b-table-column field="quantity" label="Quantity">{{ props.row.quantity }}</b-table-column>
            <b-table-column field="buyPrice" label="Buy Price">${{ props.row.buyPrice }}</b-table-column>
            <b-table-column field="createdDate" label="Date" centered>
                <span class="tag is-success">{{ new Date(props.row.createdDate).toLocaleDateString() }}</span>
            </b-table-column>
        </template>
    </b-table>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import inventories from "../store";
import {
    IProduct,
    IEnumModel,
    IProductColor,
    IProductSize,
    ISeacchInventoryOption
} from "@/store/models";

@Component
export default class InventoryTable extends Vue {
    mounted() {
        this.$nextTick(() => {
            inventories.getAllInventory().then(res => {
                inventories.searchInventory(this.getFilters);
            });
        });
    }

    @Prop() readonly filters!: ISeacchInventoryOption;

    defaultFilter(): ISeacchInventoryOption {
        return {
            name: "",
            buyPrice: ""
        } as ISeacchInventoryOption;
    }

    get getFilters() {
        return inventories.inventoryFilterOption;
    }

    get getData() {
        return inventories.filteredInventories;
    }
}
</script>

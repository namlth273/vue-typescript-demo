<template>
    <b-table :data="getData" striped narrowed>
        <template slot-scope="props">
            <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
            <b-table-column field="description" label="Description">{{ props.row.description }}</b-table-column>
            <b-table-column>
                <i class="fa fa-edit row-edit-icon" @click="edit(props.row)"></i>
            </b-table-column>
        </template>
    </b-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import products from "../store";
import { ISaveProduct, IProduct } from "@/store/models";

@Component({
    components: {
    }
})
export default class ProductTable extends Vue {
    mounted() {
        this.$nextTick(() => {
            products.getAll().then(() => {
                products.search();
            });
        });
    }

    get getData() {
        return products.filteredProducts;
    }

    edit(item: IProduct) {
        products.setSelectedProduct(item);
    }
}
</script>

<style lang="scss">
.row-edit-icon {
    cursor: pointer;
    
    &:hover {
        color: lightblue;
    }
}
</style>

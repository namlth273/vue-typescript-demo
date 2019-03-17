<template>
    <b-table :data="getData" striped narrowed>
        <template slot-scope="props">
            <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
            <b-table-column field="description" label="Description">{{ props.row.description }}</b-table-column>
        </template>
    </b-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import products from "../store";
import { ISaveProduct } from "@/store/models";

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
}
</script>

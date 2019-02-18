<template>
    <b-pagination class="iot-module-paging"
        @change="onPageChange"
        align="center"
        size="md"
        :total-rows="getItemsCount"
        :per-page="getItemsPerPage"
        v-model="currentPage"
        :limit="6">
        <div slot="first-text"><span class="paging-arrow back"></span></div>
        <div slot="prev-text"><span class="paging-arrow back single"></span></div>
        <div slot="next-text"><span class="paging-arrow single"></span></div>
        <div slot="last-text"><span class="paging-arrow"></span></div>
    </b-pagination>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import products from "@/store/modules/products";

@Component
export default class IotModulesPagination extends Vue {
    currentPage: number = 1;

    get getCurrentPage() {
        return products.getCurrentPage;
    }

    get getItemsPerPage() {
        return products.getItemsPerPage;
    }

    get getItemsCount() {
        if (products.getProductInventories)
            return products.getProductInventories.length;
        else return 0;
    }

    get getPagesCount() {
        return Math.ceil(this.getItemsCount / this.getItemsPerPage);
    }

    onPageChange(pageNumber) {
        products.setCurrentPage(pageNumber);
    }
}
</script>

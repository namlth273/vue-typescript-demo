<template>
    <div></div>
    <!-- <b-pagination class="iot-module-paging"
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
    </b-pagination> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import inventories from "@/store/modules/inventory";

@Component
export default class IotModulesPagination extends Vue {
    currentPage: number = 1;

    get getCurrentPage() {
        return inventories.getCurrentPage;
    }

    get getItemsPerPage() {
        return inventories.getItemsPerPage;
    }

    get getItemsCount() {
        if (inventories.getFilteredInventories)
            return inventories.getFilteredInventories.length;
        else return 0;
    }

    get getPagesCount() {
        return Math.ceil(this.getItemsCount / this.getItemsPerPage);
    }

    onPageChange(pageNumber) {
        inventories.setCurrentPage(pageNumber);
    }
}
</script>

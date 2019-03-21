<template>
    <select v-model="selectedSize">
        <option :value="null">--Select--</option>
        <option v-for="size in getSizes" :key="size.id" :value="size">{{size.description}}</option>
    </select>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Guid } from "guid-typescript";
import { IProductSize } from "@/store/models";
import sizes from "@/store/modules/size";

@Component
export default class SizeSelect extends Vue {
    mounted() {
        this.$nextTick(() => {
            sizes.getAll();
        });
    }
    
    @Watch("selectedSize")
    onColorChanged(newValue, oldValue) {
        sizes.SETSELECTEDSIZE(newValue);
    }
    
    selectedSize: IProductSize | null = null;

    get getSizes() {
        return sizes.sizes;
    }

}
</script>

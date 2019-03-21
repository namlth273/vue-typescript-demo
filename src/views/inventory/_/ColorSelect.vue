<template>
    <select v-model="selectedColor">
        <option :value="null">--Select--</option>
        <option v-for="color in getColors" :key="color.id" :value="color">{{color.description}}</option>
    </select>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Guid } from "guid-typescript";
import colors from "@/store/modules/color";
import { IProductColor } from "@/store/models";

@Component
export default class ColorSelect extends Vue {
    mounted() {
        this.$nextTick(() => {
            colors.getAll();
        });
    }
    
    @Watch("selectedColor")
    onColorChanged(newValue, oldValue) {
        colors.SETSELECTEDCOLOR(newValue);
    }

    selectedColor: IProductColor | null = null;

    get getColors() {
        return colors.colors;
    }

}
</script>

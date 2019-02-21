<template>
    <ui-select
        has-search
        floatingLabel
        label="Color"
        placeholder="Select color..."
        :keys="{ label: 'description', value: 'id' }"
        :options="getColors"
        v-model="selectedColor">
    </ui-select>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UiSelect from "keen-ui/src/UiSelect.vue";
import { IProduct, IEnumModel, IProductColor, IProductSize } from "@/store/models";
import colors from "@/store/modules/color";

@Component({
    components: {
        UiSelect
    }
})
export default class ColorSelection extends Vue {    
    selectedColor: IProductColor = {} as IProductColor;

    @Watch("selectedColor")
    onColorChanged(newValue, oldValue) {
        colors.SETSELECTEDCOLOR(newValue);
    }

    get getColors(): Array<IEnumModel> {
        return colors.getColors;
    }
}
</script>

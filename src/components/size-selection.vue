<template>
    <ui-select
        has-search
        floatingLabel
        label="Size"
        placeholder="Select size..."
        :keys="{ label: 'description', value: 'id' }"
        :options="getSizes"
        v-model="selectedSize">
    </ui-select>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UiSelect from "keen-ui/src/UiSelect.vue";
import { IProduct, IEnumModel, IProductSize } from "@/store/models";
import sizes from "@/store/modules/sizes";

@Component({
    components: {
        UiSelect
    }
})
export default class SizeSelection extends Vue {    
    selectedSize: IProductSize = {} as IProductSize;

    @Watch("selectedSize")
    onColorChanged(newValue, oldValue) {
        sizes.SETSELECTEDSIZE(newValue);
    }

    get getSizes(): Array<IProductSize> {
        return sizes.getSizes;
    }
}
</script>

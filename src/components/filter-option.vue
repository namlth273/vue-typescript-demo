<template>
    <div>
        <b-row>
            <b-col>
                <b-form-select v-model="selectedField">
                    <option :value="null" selected>Select field...</option>
                    <option class="" v-for="option in pairingFields"
                        :key="option"
                        :value="option">
                    {{option}}
                    </option>
                </b-form-select>
            </b-col>
            <b-col>
                <b-form-select v-model="selectedFilter">
                    <option :value="null" selected>Select filter...</option>
                    <option class="" v-for="option in getFilterOptions"
                        :key="option"
                        :value="option">
                    {{option}}
                    </option>
                </b-form-select>
            </b-col>
            <b-col>
                <b-input/>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class FilterOption extends Vue {
    selectedField: string | null = null;
    selectedFilter: string | null = null;
    pairingFields: Array<string> = [
        "Name",
        "Description",
        "Quantity"
    ];

    filterOptions: Array<string> = [
        "Equal to",
        "Not equal",
        "Begins with",
        "Contains",
        "Greater than",
        "Less than"
    ]

    get getFilterOptions(): Array<string> {
        if (this.selectedField) {
            return this.filterOptions;
        }

        return [];
    }
}
</script>

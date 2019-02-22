<template>
    <div>
        <b-form-row v-for="(model, index) in getDynamicFilterOptions" :key="model.id.toString()">
            <b-col sm="11">
                <b-form-row>
                    <b-col>
                        <div class="form-group">
                            <b-form-select v-model="model.selectedField">
                                <option :value="null" selected>Select field...</option>
                                <option class="" v-for="(option_obj, option) in model.fields"
                                    :key="option"
                                    :value="option">
                                {{option}}
                                </option>
                            </b-form-select>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <b-form-select v-model="model.selectedFilter">
                                <option :value="null" selected>Select filter...</option>
                                <option class="" v-for="option in model.fields[model.selectedField]"
                                    :key="option.value"
                                    :value="option.value">
                                {{option.text}}
                                </option>
                            </b-form-select>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <b-input v-model="model.comparingValue"/>
                        </div>
                    </b-col>
                </b-form-row>
            </b-col>
            <b-col sm="1">
                <ui-button color="info" @click="removeFilter(index)">
                    <v-icon name="times"/>
                </ui-button>
            </b-col>
        </b-form-row>
        
        <b-row class="mb-3">
            <b-col class="d-flex justify-content-start">
                <ui-button color="primary" @click="addMoreFilterOption">
                    <div slot="icon">
                        <v-icon name="plus"/>
                    </div>
                    <span>Add new filter</span>
                </ui-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="d-flex justify-content-start">
                <ui-button color="primary" @click="testClick">
                    <div slot="icon">
                        <v-icon name="plus"/>
                    </div>
                    <span>Trigger filter...</span>
                </ui-button>
            </b-col>
        </b-row>
        {{getInventories.length}}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Guid } from "guid-typescript";
import * as services from "./services";
import inventories from "@/store/modules/inventory";
import UiButton from "keen-ui/src/UiButton.vue";
import { IDynamicFilterOption, IDynamicFilterField, IFilterOption, IBaseFilterService, ISelectOption, IDictionary } from "@/store/models";
import { IProduct } from "@/store/models";

@Component({
    components: {
        UiButton
    }
})
export default class FilterOption extends Vue {
    filterFactory: services.DynamicFilterFactory = new services.DynamicFilterFactory();
    dynamicFilterOptions: IDynamicFilterOption[] = [];
    allFilters: IFilterOption[] = [];

    get getDynamicFilterOptions() {
        return this.dynamicFilterOptions;
    }

    get getInventories() {
        if (this.allFilters.length == 0) return inventories.getProductInventories;

        var filteredResult = inventories.getProductInventories.filter(item => {
            return this.allFilters.every(filter => {
                var result = filter.method(item, filter.fieldName, filter.defaultValue);
                // console.log("Run filter "
                //     + filter.name + "... | item: "
                //     + JSON.stringify(item[filter.fieldName])
                //     + " | compareValue: "
                //     + filter.defaultValue
                //     + " | result: " + result);

                return result;
            });
        });

        // console.log(JSON.stringify(filteredResult));
        return filteredResult;
    }
    
    addMoreFilterOption() {
        this.dynamicFilterOptions.push({
            id: Guid.create(),
            fields: {
                "name": [
                            { text: "Equal to", value: services.EnumFilterService.EqualsTo },
                            { text: "Not equal", value: services.EnumFilterService.NotEquals },
                            { text: "Begins with", value: services.EnumFilterService.BeginsWith },
                            { text: "Contains", value: services.EnumFilterService.Contains },
                        ],
                "description":  [
                                    { text: "Contains", value: services.EnumFilterService.Contains },
                                ],
                "quantity": [
                                { text: "Greater than", value: services.EnumFilterService.GreaterThan },
                                { text: "Less than", value: services.EnumFilterService.LessThan }
                            ]
            },
            selectedField: null,
            selectedFilter: null,
            comparingValue: null
        });
    }

    removeFilter(index) {
        this.dynamicFilterOptions.splice(index, 1);
    }

    testClick() {
        this.dynamicFilterOptions.forEach(filterItem => {
            var strategy = this.filterFactory.strategies[filterItem.selectedFilter] as IBaseFilterService;
            strategy.id = filterItem.id;
            strategy.fieldName = filterItem.selectedField;
            strategy.defaultValue = filterItem.comparingValue;
            var createdFilter = strategy.createFilter();

            var findExistedFilter = this.allFilters.filter(item => item.id == filterItem.id);
            if (findExistedFilter && findExistedFilter.length > 0) {
                this.allFilters.splice(this.allFilters.indexOf(findExistedFilter[0]), 1);
            }

            this.allFilters.push(createdFilter);
        });
    }
}

</script>

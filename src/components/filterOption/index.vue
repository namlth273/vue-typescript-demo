<template>
    <div>
        <!-- <b-form-row v-for="(model, index) in getDynamicFilterOptions" :key="model.id.toString()">
            <b-col sm="11">
                <b-form-row class="mb-3">
                    <b-col>
                        <b-form-select v-model="model.selectedField">
                            <option :value="null" selected>Select field...</option>
                            <option class="" v-for="option in filterFields"
                                :key="option.value"
                                :value="option.value">
                            {{option.text}}
                            </option>
                        </b-form-select>
                    </b-col>
                    <b-col>
                        <b-form-select v-model="model.selectedFilter">
                            <option :value="null" selected>Select filter...</option>
                            <option class="" v-for="option in model.fields[model.selectedField]"
                                :key="option.value"
                                :value="option.value">
                            {{option.text}}
                            </option>
                        </b-form-select>
                    </b-col>
                    <b-col class="d-flex justify-content-center align-items-center">
                        <b-input disabled v-if="!model.selectedField"/>
                        <b-input v-model="model.comparingValue" v-if="model.thirdColumnFieldType[model.selectedField] == 0"/>
                        <ui-checkbox :value="true" disabled class="mb-0" v-if="model.thirdColumnFieldType[model.selectedField] == 1"></ui-checkbox>
                        <ui-datepicker class="form-control"
                            picker-type="modal"
                            v-model="model.comparingValue"
                            v-if="model.thirdColumnFieldType[model.selectedField] == 2"
                        ></ui-datepicker>
                    </b-col>
                </b-form-row>
            </b-col>
            <b-col sm="1" v-if="model.comparingValue">
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
                <ui-button color="primary" @click="applyFilters">
                    <div slot="icon">
                        <v-icon name="plus"/>
                    </div>
                    <span>Trigger filter...</span>
                </ui-button>
            </b-col>
        </b-row> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Guid } from "guid-typescript";
import * as services from "./services";
import inventories from "@/store/modules/inventory";
import {
    IDynamicFilterOption, IBaseFilterService,
    IDynamicFilterField, IFilterOption,
    ISelectOption, IDictionary,
    IDynamicThirdColumnFieldType 
    } from "@/store/models";
import { IProduct } from "@/store/models";

@Component({
    components: {
    }
})
export default class FilterOption extends Vue {
    mounted() {
        this.addMoreFilterOption();
    }

    filterFields: ISelectOption[] = [
        {
            text: "Name",
            value: services.EnumFilterField.Name
        },
        {
            text: "Description",
            value: services.EnumFilterField.Description
        },
        {
            text: "Quantity",
            value: services.EnumFilterField.Quantity
        },
        {
            text: "Status",
            value: services.EnumFilterField.IsDeleted
        },
        {
            text: "Created Date",
            value: services.EnumFilterField.CreatedDate
        }
    ];
    filterFactory: services.DynamicFilterFactory = new services.DynamicFilterFactory();
    dynamicFilterOptions: IDynamicFilterOption[] = [];
    allFilters: IFilterOption[] = [];

    get getDynamicFilterOptions() {
        return this.dynamicFilterOptions;
    }

    get getInventories() {
        return inventories.filteredInventories;
    }
    
    addMoreFilterOption() {
        this.dynamicFilterOptions.push({
            id: Guid.create(),
            fields: this.filterFactory.create2ndFieldOptions(),
            thirdColumnFieldType: this.filterFactory.create3rdFieldOptions(),
            selectedField: null,
            selectedFilter: null,
            comparingValue: null
        });
    }

    removeFilter(index) {
        this.dynamicFilterOptions.splice(index, 1);
    }

    applyFilters() {
        this.allFilters = [];
        
        this.dynamicFilterOptions.forEach(filterItem => {
            if (!filterItem.comparingValue) return;
            
            // Check if filter already existed then remove
            var findExistedFilter = this.allFilters.filter(item => item.id == filterItem.id);
            
            if (findExistedFilter && findExistedFilter.length > 0) {
                this.allFilters.splice(this.allFilters.indexOf(findExistedFilter[0]), 1);
            }

            // Get the service to create filter
            var strategy = this.filterFactory.strategies[filterItem.selectedFilter] as IBaseFilterService;
            
            // Set required properties
            strategy.id = filterItem.id;
            strategy.fieldName = filterItem.selectedField;
            strategy.defaultValue = filterItem.comparingValue;

            // Create filter
            var createdFilter = strategy.createFilter();

            // Push to array
            this.allFilters.push(createdFilter);
        });

        inventories.setDynamicFilters(this.allFilters);
        inventories.searchInventoryDynamic();
        inventories.setCurrentPage(1);
    }
}
</script>

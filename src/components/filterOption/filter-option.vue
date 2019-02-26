<template>
    <div>
        <b-form-row v-for="(model, index) in getDynamicFilterOptions" :key="model.id.toString()">
            <b-col sm="11">
                <b-form-row class="mb-3">
                    <b-col>
                            <!-- <b-form-select v-model="model.selectedField">
                                <option :value="null" selected>Select field...</option>
                                <option class="" v-for="(option_obj, option) in model.fields"
                                    :key="option"
                                    :value="option">
                                {{option}}
                                </option>
                            </b-form-select> -->
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
                        <b-input v-model="model.comparingValue" v-if="model.thirdColumnFieldType[model.selectedField] == 0"/>
                        <ui-checkbox :value="true" disabled class="mb-0" v-if="model.thirdColumnFieldType[model.selectedField] == 1"></ui-checkbox>
                        <ui-datepicker class="form-control"
                            v-model="model.comparingValue"
                            v-if="model.thirdColumnFieldType[model.selectedField] == 2"
                        ></ui-datepicker>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Guid } from "guid-typescript";
import * as services from "./services";
import inventories from "@/store/modules/inventory";
import UiButton from "keen-ui/src/UiButton.vue";
import UiCheckbox from "keen-ui/src/UiCheckbox.vue";
import UiDatepicker from "keen-ui/src/UiDatepicker.vue";
import { IDynamicFilterOption, IDynamicFilterField, IFilterOption, IBaseFilterService,
    ISelectOption, IDictionary, IDynamicThirdColumnFieldType } from "@/store/models";
import { IProduct } from "@/store/models";

@Component({
    components: {
        UiButton,
        UiCheckbox,
        UiDatepicker
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
    ]
    filterFactory: services.DynamicFilterFactory = new services.DynamicFilterFactory();
    dynamicFilterOptions: IDynamicFilterOption[] = [];
    allFilters: IFilterOption[] = [];

    get getDynamicFilterOptions() {
        return this.dynamicFilterOptions;
    }

    get getInventories() {
        // if (this.allFilters.length == 0) return inventories.getProductInventories;

        // var filteredResult = inventories.getProductInventories.filter(item => {
        //     return this.allFilters.every(filter => {
        //         var result = filter.method(item, filter.fieldName, filter.defaultValue);
        //         // console.log("Run filter "
        //         //     + filter.name + "... | item: "
        //         //     + JSON.stringify(item[filter.fieldName])
        //         //     + " | compareValue: "
        //         //     + filter.defaultValue
        //         //     + " | result: " + result);

        //         return result;
        //     });
        // });

        // // console.log(JSON.stringify(filteredResult));
        // return filteredResult;
        return inventories.filteredInventories;
    }
    
    addMoreFilterOption() {
        var fields: IDynamicFilterField = {};
        fields[services.EnumFilterField.Name] = [
            { text: "Equal to", value: services.EnumFilterService.EqualsTo },
            { text: "Not equal", value: services.EnumFilterService.NotEquals },
            { text: "Begins with", value: services.EnumFilterService.BeginsWith },
            { text: "Contains", value: services.EnumFilterService.Contains },
        ];
        fields[services.EnumFilterField.Description] = [
            { text: "Contains", value: services.EnumFilterService.Contains },
        ];
        fields[services.EnumFilterField.Quantity] = [
            { text: "Greater than", value: services.EnumFilterService.GreaterThan },
            { text: "Less than", value: services.EnumFilterService.LessThan }
        ];
        fields[services.EnumFilterField.IsDeleted] = [
            { text: "Equal to", value: services.EnumFilterService.EqualsToChecked },
            { text: "Not equal", value: services.EnumFilterService.NotEqualsToChecked }
        ];
        fields[services.EnumFilterField.CreatedDate] = [
            { text: "Equal to", value: services.EnumFilterService.DateEqualsTo },
        ];

        var thirdColumnFieldType: IDynamicThirdColumnFieldType = {};
        thirdColumnFieldType[services.EnumFilterField.Name] = services.EnumThirdColumnFieldType.Text;
        thirdColumnFieldType[services.EnumFilterField.Description] = services.EnumThirdColumnFieldType.Text;
        thirdColumnFieldType[services.EnumFilterField.Quantity] = services.EnumThirdColumnFieldType.Text;
        thirdColumnFieldType[services.EnumFilterField.IsDeleted] = services.EnumThirdColumnFieldType.Checked;
        thirdColumnFieldType[services.EnumFilterField.CreatedDate] = services.EnumThirdColumnFieldType.Date;

        this.dynamicFilterOptions.push({
            id: Guid.create(),
            fields: fields,
            // fields: {
            //     "name": [
            //                 { text: "Equal to", value: services.EnumFilterService.EqualsTo },
            //                 { text: "Not equal", value: services.EnumFilterService.NotEquals },
            //                 { text: "Begins with", value: services.EnumFilterService.BeginsWith },
            //                 { text: "Contains", value: services.EnumFilterService.Contains },
            //             ],
            //     "description":  [
            //                         { text: "Contains", value: services.EnumFilterService.Contains },
            //                     ],
            //     "quantity": [
            //                     { text: "Greater than", value: services.EnumFilterService.GreaterThan },
            //                     { text: "Less than", value: services.EnumFilterService.LessThan }
            //                 ]
            // },
            thirdColumnFieldType: thirdColumnFieldType,
            selectedField: null,
            selectedFilter: null,
            comparingValue: null
        });
    }

    removeFilter(index) {
        this.dynamicFilterOptions.splice(index, 1);
    }

    testClick() {
        if (this.dynamicFilterOptions.length == 0) {
            this.allFilters = [];
        }
        
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

        inventories.setDynamicFilters(this.allFilters);
        inventories.searchInventoryDynamic();
    }
}
</script>

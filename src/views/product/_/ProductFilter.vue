<template>
    <form @submit.prevent="doSearch">
        <b-field label="Name" horizontal class="is-normal"
            :type="{'is-danger': veeErrors.has('Name')}"
            :message="veeErrors.first('Name')">
            <b-input v-model="product['name']" name="Name" v-validate="'required'" />
        </b-field>
        <b-field label="Description" horizontal
            :type="{'is-danger': veeErrors.has('Description')}"
            :message="veeErrors.first('Description')">
            <b-input v-model="product['description']" name="Description" v-validate="'required'" />
        </b-field>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <button type="submit" class="button is-primary">Search</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import products from "../store";
import { IProduct, ISaveProduct } from "@/store/models";

@Component({
    components: {
    }
})
export default class ProductFilter extends Vue {
    product: ISaveProduct = {} as ISaveProduct;

    doSearch() {
        this.$validator.validateAll().then(result => {
            if (result) {
                products.setFilterOption(this.product);
                products.search();
            }
        });
    }
}
</script>

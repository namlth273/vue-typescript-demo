<template>
    <form @submit.prevent="save">
        <strong>Add Form</strong>
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
                <div class="field is-grouped">
                    <div class="control">
                        <button type="submit" class="button is-link">Add</button>
                    </div>
                    <div class="control">
                        <button type="button" class="button is-primary" @click="clear">Clear</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from "vue-property-decorator";
import products from "../store";
import { IProduct, ISaveProduct } from "@/store/models";

@Component
export default class ProductAddForm extends Vue {
    product: ISaveProduct = {} as ISaveProduct;

    save() {
        this.$validator.validateAll().then(result => {
            if (result) {
                products.saveProduct(this.product).then(() => {
                    this.$emit("added");
                });
            }
        });
    }

    clear() {
        this.product = {} as IProduct;
    }
}
</script>

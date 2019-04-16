<template>
    <form @submit.prevent="save">
        <b-field label="Name" horizontal class="is-normal"
            :type="{'is-danger': veeErrors.has('Name')}"
            :message="veeErrors.first('Name')">
            <b-input v-model="getProduct['name']" name="Name" v-validate="'required'" />
        </b-field>
        <b-field label="Description" horizontal
            :type="{'is-danger': veeErrors.has('Description')}"
            :message="veeErrors.first('Description')">
            <b-input v-model="getProduct['description']" name="Description" v-validate="'required'" />
        </b-field>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            </div>
            <div class="field-body">
                <div class="field is-grouped">
                    <div class="control">
                        <button type="submit" class="button is-link">Save</button>
                    </div>
                    <div class="control">
                        <button type="button" class="button is-primary" @click="clear()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import products from "../store";
import { IProduct, ISaveProduct } from "@/store/models";

@Component({
    components: {
    }
})
export default class ProductForm extends Vue {
    @Model("clear") readonly modelProduct!: ISaveProduct;

    get getProduct() {
        return this.modelProduct;
    }

    save() {
        this.$validator.validateAll().then(result => {
            if (result) {
                products.saveProduct(this.getProduct).then(() => {
                    this.$emit("saved");
                });
            }
        });
    }

    clear() {
        this.$emit("clear");
    }
}
</script>

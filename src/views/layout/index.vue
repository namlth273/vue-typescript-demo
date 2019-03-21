<template>
    <div class="layout-main">
        <navbar/>
        <app-main/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Navbar, AppMain } from "./components";

@Component({
    components: {
        Navbar,
        AppMain
    }
})
export default class About extends Vue {

}
</script>

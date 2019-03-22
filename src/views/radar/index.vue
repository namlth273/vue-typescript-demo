<template>
    <div>
        <section class="section section--mod">
            <div class="columns">
                <div class="column is-12">
                    <div class="box">
                        <div class="radar-slider-top">
                            <div class="slider-option-top" v-for="option in options" :key="option.id">
                                <i class="fa fa-sort-down slider-option-top-icon" :class="{ active: isActive(option.id) }"></i>
                            </div>
                        </div>
                        <div class="radar-slider">
                            <div class="slider-option"
                                v-for="option in options"
                                :key="option.id"
                                @click="click(option.id)"
                                :class="{ active: isActive(option.id), first: option.isFirst, last: option.isLast }">
                                <div class="slider-content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface ISliderOption {
    id: number,
    isFirst: boolean,
    isLast: boolean
}

@Component
export default class Radar extends Vue {
    activeOptionId: number | null = null;

    options: ISliderOption[] = [
        {
            id: 1, isFirst: true, isLast: false
        },
        {
            id: 2, isFirst: false, isLast: false
        },
        {
            id: 3, isFirst: false, isLast: false
        },
        {
            id: 4, isFirst: false, isLast: false
        },
        {
            id: 5, isFirst: false, isLast: true
        }
    ]

    isActive(value: number) {
        return this.activeOptionId == value;
    }

    click(value: number) {
        console.log(value);
        this.activeOptionId = value;
    }
}
</script>

<style lang="scss">
    .radar-slider {
        background: lightblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 30px;
        margin-top: 0.5rem;
    }

    .radar-slider-top {
        margin-top: 3rem;
        background: lightblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .slider-option {
        flex: 1 1 0;
        width: 0;
        align-items: center;
        position: relative;
        display: flex;

        &:before {
            content: "";
            top: calc(50%);
            z-index: 1;
            border: 1px solid black;
            position: absolute;
            left: -1px;
            right: 0%;
            z-index: 1;
        }

        &:after {
            content: "";
            z-index: 1;
            border: 1px solid black;
            position: absolute;
            top: -50%;
            height: 100%;
            left: 50%;
            transform: translateY(50%);
        }
    }

    .slider-option-top {
        flex: 1 1 0;
        width: 0;
        align-items: center;
        position: relative;
        display: flex;
        justify-content: center;
    }

    .slider-content {
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        height: 100px;
        flex: 1 0;
    }

    .slider-option.first {
        justify-content: flex-end;
    }

    .slider-option.last {
        justify-content: flex-start;
    }

    .slider-option.first:before {
        left: 50%;
    }

    .slider-option.last:before {
        right: 50%;
    }

    .slider-option.active {
        background: lightsalmon;
        opacity: 0.2;
    }

    .slider-option.first .slider-content {
        background: lightgreen;
        flex: 0 0 50%;
    }

    .slider-option.last .slider-content {
        background: lightgreen;
        flex: 0 0 50%;
    }

    .slider-content:hover {
        background: lightslategray;
        opacity: 0.5;
        cursor: pointer;
    }

    .slider-option-top-icon {
        font-size: 2rem;
        display: none;

        &.active {
            display: block;
        }
    }
</style>

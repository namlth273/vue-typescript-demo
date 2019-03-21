<template>
    <div>
        <section class="section section--mod">
            <div class="columns">
                <div class="column is-12">
                    <div class="box">
                        <div class="radar-slider">
                            <div class="slider-option"
                                v-for="option in options"
                                @click="click(option.id)"
                                :key="option.id"
                                :class="{ active: option.isActive, first: option.isFirst, last: option.isLast }">
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
    isLast: boolean,
    isActive: boolean
}

@Component
export default class Radar extends Vue {
    options: ISliderOption[] = [
        {
            id: 1, isFirst: true, isLast: false, isActive: true
        },
        {
            id: 2, isFirst: false, isLast: false, isActive: false
        },
        {
            id: 3, isFirst: false, isLast: false, isActive: false
        },
        {
            id: 4, isFirst: false, isLast: false, isActive: false
        },
        {
            id: 5, isFirst: false, isLast: true, isActive: false
        }
    ]

    click(value: number) {
        console.log(value);
    }
}
</script>

<style lang="scss">
    .radar-slider {
        margin-top: 3rem;
        background: lightblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 30px;
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
</style>

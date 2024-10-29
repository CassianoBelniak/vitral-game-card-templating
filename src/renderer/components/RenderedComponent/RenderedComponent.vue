<script lang="ts" setup>
    import { onMounted, onUpdated, ref, watch } from 'vue';
    import { projectConfigStore } from '../../stores/project-config-store.js';
    import CardRenderer from '../../classes/card-renderer.js';
    import { imagesStore } from '../../stores/images-store.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import { fontsStore } from '../../stores/fonts-store.js';
    import { cardStore } from '../../stores/cards-store.js';
    import { exportPipelinesStore } from '../../stores/export-pipeline-store.js';
    import { Component } from '../../classes/component.js';
    import getCardSize from '../../helpers/get-card-size.js';
    import delay from '../../helpers/delay.js';

    type Variables = { [key: string]: string }

    const props = defineProps<{
        component: Component,
        variables: Variables
    }>()

    const { width, height } = getCardSize()
    const canvas = ref<HTMLCanvasElement>()
    const ctx = ref<CanvasRenderingContext2D>()

    onMounted(() => {
        if (!canvas.value) {
            return
        }
        ctx.value = canvas.value.getContext('2d')!
        setTimeout(updateCard, 10)
    })

    watch(props.component, () => {
        updateCard()
    })

    function updateCard() {
        ctx.value!.reset()
        const cardRenderer = new CardRenderer(ctx.value!)
        cardRenderer.applyComponent(props.component, props.variables)
    }

    onUpdated(() => {
        updateCard()
    })

    watch(imagesStore, () => {
        delay(100).then(updateCard)
    })
    watch(templatesStore, () => {
        delay(100).then(updateCard)
    })
    watch(fontsStore, () => {
        delay(100).then(updateCard)
    })
    watch(projectConfigStore, () => {
        delay(100).then(updateCard)
    })
    watch(cardStore, () => {
        delay(100).then(updateCard)
    })
    watch(exportPipelinesStore, () => {
        delay(100).then(updateCard)
    })


</script>
<template>
    <canvas class="card" id="cardCanvas" :width="width" :height="height" ref="canvas"></canvas>
</template>
<style lang="scss" scoped>
    .card {
        background-image: url('/checkboard.svg');
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.1);
    }
</style>
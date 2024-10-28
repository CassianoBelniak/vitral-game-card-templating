<script lang="ts" setup>
    import { onMounted, onUpdated, ref, watch } from 'vue';
    import { projectConfigStore } from '../../stores/project-config-store.js';
    import CardRenderer from '../../classes/card-renderer.js';
    import { Card } from '../../typings/card.js';
    import { imagesStore } from '../../stores/images-store.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import { fontsStore } from '../../stores/fonts-store.js';
    import { cardStore } from '../../stores/cards-store.js';
    import { exportPipelinesStore } from '../../stores/export-pipeline-store.js';
    import getCardSize from '../../helpers/get-card-size.js';
    import delay from '../../helpers/delay.js';

    const props = defineProps<{
        card: Card,
        templatesNames: string[]
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

    function updateCard() {
        ctx.value!.reset()
        const cardRenderer = new CardRenderer(ctx.value!)
        cardRenderer.applyCard(props.card, props.templatesNames)
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
    <div class="relative fit">
        <canvas class="card-canvas" id="cardCanvas" :width="width" :height="height" ref="canvas">
            <div class="hidden">{{ props.card }}</div>
        </canvas>
    </div>
</template>
<style lang="scss" scoped>
    .card-canvas {
        background-image: url('/checkboard.svg');
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
    }
</style>
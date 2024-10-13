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

    const props = defineProps<{
        card: Card,
        templatesNames: string[]
    }>()

    const { width, height } = projectConfigStore.getParsedSizes()
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
        updateCard()
    })
    watch(templatesStore, () => {
        updateCard()
    })
    watch(fontsStore, () => {
        updateCard()
    })
    watch(projectConfigStore, () => {
        updateCard()
    })
    watch(cardStore, () => {
        updateCard()
    })
    watch(exportPipelinesStore, () => {
        updateCard()
    })

</script>
<template>
    <div>
        <canvas class="card" id="cardCanvas" :width="width" :height="height" ref="canvas">
            <div class="hidden">{{ props.card }}</div>
        </canvas>
    </div>
</template>
<style lang="scss" scoped>
    .card {
        background-image: url('/checkboard.svg');
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
    }
</style>
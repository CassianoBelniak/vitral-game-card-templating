<script lang="ts" setup>
import { onMounted, onUpdated, ref, watch } from 'vue'
import { projectConfigStore } from '../../stores/project-config-store.js'
import CardRenderer from '../../classes/card-renderer.js'
import Template from '../../classes/template.js'
import { imagesStore } from '../../stores/images-store.js'
import { templatesStore } from '../../stores/templates-store.js'
import { fontsStore } from '../../stores/fonts-store.js'
import { cardStore } from '../../stores/cards-store.js'
import { exportPipelinesStore } from '../../stores/export-pipeline-store.js'
import renderGuides from '../../helpers/draw-guides.js'
import getCardSize from '../../helpers/get-card-size.js'
import delay from '../../helpers/delay.js'

const props = defineProps<{
    template: Template
    drawGuides?: boolean
}>()

const { width, height } = getCardSize()
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()
const guideCanvas = ref<HTMLCanvasElement>()
const guideCanvasCtx = ref<CanvasRenderingContext2D>()

onMounted(() => {
    if (!canvas.value || !guideCanvas.value) {
        return
    }
    ctx.value = canvas.value.getContext('2d')!
    guideCanvasCtx.value = guideCanvas.value.getContext('2d')!
    setTimeout(updateCard, 10)
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

function updateCard() {
    ctx.value!.reset()
    const cardRenderer = new CardRenderer(ctx.value!)
    cardRenderer.applyTemplate(props.template)
    guideCanvasCtx.value!.reset()
    if (props.drawGuides) {
        renderGuides(props.template, guideCanvas.value!)
    }
}

onUpdated(() => {
    updateCard()
})

watch(props.template, () => {
    updateCard()
})
</script>
<template>
    <div class="relative">
        <canvas class="card full" id="cardCanvas" :width="width" :height="height" ref="canvas"></canvas>
        <canvas class="guides" :width="width" :height="height" ref="guideCanvas"></canvas>
    </div>
</template>
<style lang="scss" scoped>
.card {
    background-image: url('/checkboard.svg');
    box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.5),
        0 6px 20px rgba(0, 0, 0, 0.1);
}

.guides {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}

.full {
    width: 100%;
    height: 100%;
}
</style>

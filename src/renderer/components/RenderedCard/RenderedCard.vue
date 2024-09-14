<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import { projectConfigStore } from '../../stores/project-config-store.js';
import CardRenderer from '../../classes/card-renderer.js';
import { Card } from '../../typings/card.js';

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

</script>
<template>
    <canvas class="card" id="cardCanvas" :width="width" :height="height" ref="canvas">
        <div class="hidden">{{ props.card }}</div>
    </canvas>
</template>
<style lang="scss" scoped>
    .card {
        background-image: url('/checkboard.svg');
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.1);
    }
</style>
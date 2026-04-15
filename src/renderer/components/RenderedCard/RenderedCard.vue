<script lang="ts" setup>
import { Card } from '../../typings/card.js'
import { getRenderedCard, renderStore } from '../../stores/render-store.js'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    card: Card
    side: 'front' | 'back'
    priority?: boolean
}>()

const renderedCard = ref(getRenderedCard({ card: props.card, side: props.side, priority: props.priority }))

watch(
    () => renderStore.renderCount,
    () => {
        renderedCard.value = getRenderedCard({ card: props.card, side: props.side, priority: props.priority })
    },
)
</script>
<template>
    <div class="relative fit row justify-center">
        <q-img v-if="renderedCard" :src="renderedCard" />
        <q-spinner v-else size="lg" />
        <div class="hidden">{{ renderStore.renderCount }}</div>
    </div>
</template>
<style lang="scss" scoped>
.card-canvas {
    background-image: url('/checkboard.svg');
    box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.5),
        0 6px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
}
</style>

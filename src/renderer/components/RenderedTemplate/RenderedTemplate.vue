<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import { projectConfigStore } from '../../stores/project-config-store.js';
import CardRenderer from '../../classes/card-renderer.js';
import Template from '../../classes/template.js';

const props = defineProps<{
    template: Template
}>()

const { width, height } = projectConfigStore.getParsedSizes()
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
    if (!canvas.value) {
        return
    }
    console.log('RenderedTemplate mounted')
    ctx.value = canvas.value.getContext('2d')!
})

onUpdated(() => {
    const cardRenderer = new CardRenderer(ctx.value!)
    cardRenderer.applyTemplate(props.template)
    console.log('RenderedTemplate updated')
})

</script>
<template>
    <canvas class="card" id="cardCanvas" :width="width" :height="height" ref="canvas">
        <div class="hidden">{{ props.template }}</div>
    </canvas>
</template>
<style lang="scss" scoped>
.card {
    background-image: url('/checkboard.svg');
}
</style>
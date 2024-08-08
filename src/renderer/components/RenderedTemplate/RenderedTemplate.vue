<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { projectConfigStore } from '../../stores/project-config-store.js';
import CardRenderer from '../../classes/card-renderer.js';
import Template from '../../classes/template.js';

const props = defineProps<{
    template: Template
}>()

const { width, height } = projectConfigStore.getParsedSizes()
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
    if (!canvas.value) {
        return
    }
    const cardRenderer = new CardRenderer(canvas.value)
    cardRenderer.applyTemplate(props.template)
})

</script>
<template>
    <canvas class="card" :width="width" :height="height" ref="canvas"></canvas>
</template>

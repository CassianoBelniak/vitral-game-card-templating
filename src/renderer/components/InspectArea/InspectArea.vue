<script lang="ts" setup>
    import { onMounted, onUnmounted, ref } from 'vue';

    const offsetX = ref(0)
    const offsetY = ref(0)
    const isDragging = ref(false)

    const modelZoom = defineModel<number>('zoom')

    function onMouseUp() {
        isDragging.value = false
    }

    function onMouseDrag(event: MouseEvent) {
        if (isDragging.value) {
            offsetX.value += event.movementX
            offsetY.value += event.movementY
        }
    }

    function onWheel(event: WheelEvent) {
        modelZoom.value! -= event.deltaY
        if (modelZoom.value! < 1) {
            modelZoom.value = 1
        }
    }

    onMounted(() => {
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseDrag);
    })

    onUnmounted(() => {
        window.removeEventListener('mouseup', onMouseUp)
        window.removeEventListener('mousemove', onMouseDrag);
    })


</script>
<template>
    <div class="overflow-clip relative" @mousedown="isDragging = true" @wheel="onWheel">
        <div class="absolute" :style="{ top: `${offsetY}px`, left: `${offsetX}px` }">
            <slot></slot>
        </div>
    </div>
</template>
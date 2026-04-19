<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { processCardQueue } from '../../stores/render-store'

onMounted(() => {
    const id = setInterval(processCardQueue, 20)
    onBeforeUnmount(() => clearInterval(id))
})
</script>

<template>
    <div></div>
</template>

<style lang="scss" scoped></style>


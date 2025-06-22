<script lang="ts" setup>
import ContentPad from '../components/ContentPad/ContentPad.vue'
import { projectConfigStore } from '../stores/project-config-store.js'

function onSelected(file: string) {
    window.electronAPI.showFile(`${projectConfigStore.workingDirectory}/assets/${file}`)
}
</script>
<template>
    <ContentPad>
        <ResourceTree :include-fonts="true" :include-images="true" @selected="onSelected" />
    </ContentPad>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}
</style>

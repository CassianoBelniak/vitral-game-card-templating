<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import resetStores from '../helpers/reset-stores.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { addRecentProject, removeRecentProject } from '../services/config-service.js'
import { watchFileChanges } from '../helpers/file-handling/watch-file-changes.js'
import { assertProjectStructure } from '../helpers/file-handling/assert-project-structure.js'
import { onMounted, ref } from 'vue'
import { loadAllCardFiles } from '../stores/cards-store.js'
import delay from '../helpers/delay.js'
import { loadAllPipelines } from '../stores/export-pipeline-store.js'
import { loadAllFonts } from '../stores/fonts-store.js'
import { loadAllImages } from '../stores/images-store.js'
import { loadAllTemplates } from '../stores/templates-store.js'
import { globalStore } from '../stores/global-store.js'

const route = useRoute()
const router = useRouter()
const loadPath = route.query.loadPath?.toString() || ''
const loadingLabel = ref('Loading project')

async function isProjectValid(projectPath: string) {
    const content = await window.electronAPI.loadFile(projectPath)
    return !!content
}

async function openProject(path: string) {
    if (!(await isProjectValid(path))) {
        await removeRecentProject(path)
        router.push({ path: '/projects' })
        return
    }
    globalStore.isProjectLoading = true
    await delay(100)
    loadingLabel.value = 'Closing old project'
    resetStores()
    await delay(100)
    loadingLabel.value = 'Loading project configs'
    await projectConfigStore.setProject(path)
    await delay(100)
    loadingLabel.value = 'Adding project to recent list'
    await addRecentProject(path)
    await delay(100)
    loadingLabel.value = 'Asserting project structure'
    await assertProjectStructure(projectConfigStore.workingDirectory)
    await delay(100)
    loadingLabel.value = 'Loading cards'
    await loadAllCardFiles()
    await delay(100)
    loadingLabel.value = 'Loading pipelines'
    await loadAllPipelines()
    await delay(100)
    loadingLabel.value = 'Loading fonts'
    await loadAllFonts()
    await delay(100)
    loadingLabel.value = 'Loading images'
    await loadAllImages()
    await delay(100)
    loadingLabel.value = 'Loading templates'
    await loadAllTemplates()
    await delay(100)
    loadingLabel.value = 'Watching files'
    await watchFileChanges(projectConfigStore.workingDirectory)
    await delay(100)
    globalStore.isProjectLoading = false
    loadingLabel.value = 'Project loaded!'
    router.push({ path: '/cards' })
}

onMounted(() => openProject(loadPath))
</script>

<template>
    <div class="w-full h-full column items-center justify-center gap-2">
        <q-spinner size="lg" />
        <div>{{ loadingLabel }}</div>
        <div>
            {{ loadPath }}
        </div>
    </div>
</template>

<style lang="scss" scoped></style>


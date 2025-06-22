<script setup lang="ts">
import { pickLoadProjectPath } from '../helpers/file-handling/pick-load-project-path'
import { pickNewProjectPath } from '../helpers/file-handling/pick-new-project-path'
import { addRecentProject } from '../services/config-service'
import { useRouter } from 'vue-router'
import ContentPad from '../components/ContentPad/ContentPad.vue'
import { projectConfigStore } from '../stores/project-config-store.js'
import { assertProjectStructure } from '../helpers/file-handling/assert-project-structure.js'
import { watchFileChanges } from '../helpers/file-handling/watch-file-changes.js'
import resetStores from '../helpers/reset-stores.js'
const router = useRouter()

async function onNewProject() {
    const file = await pickNewProjectPath()
    if (!file) return
    resetStores()
    projectConfigStore.setProject(file)
    addRecentProject(file)
    watchFileChanges(projectConfigStore.workingDirectory)
    assertProjectStructure(projectConfigStore.workingDirectory)
    router.push({ path: '/cards' })
}

async function onLoadProject() {
    const file = await pickLoadProjectPath()
    if (!file) return
    resetStores()
    addRecentProject(file)
    projectConfigStore.setProject(file)
    assertProjectStructure(projectConfigStore.workingDirectory)
    watchFileChanges(projectConfigStore.workingDirectory)
    setTimeout(() => {
        router.push({ path: '/cards' })
    }, 500)
}
</script>
<template>
    <ContentPad>
        <div class="text-h6 mb-2">Vitral</div>
        <q-btn class="mr-2 mb-4" push icon="add" align="left" @click="onNewProject()" no-caps>New project</q-btn>
        <q-btn class="mb-4" push icon="save" align="left" @click="onLoadProject()" no-caps>Load project</q-btn>

        <RecentProjects />
    </ContentPad>
</template>

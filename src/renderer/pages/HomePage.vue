<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { addRecentProject, removeRecentProject } from '../services/config-service.js'
import resetStores from '../helpers/reset-stores.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { assertProjectStructure } from '../helpers/file-handling/assert-project-structure.js'
import { watchFileChanges } from '../helpers/file-handling/watch-file-changes.js'
import { onMounted } from 'vue'

const router = useRouter()

const projectPath = window.electronAPI.projectPath || ''

async function isProjectValid(projectPath: string) {
    const content = await window.electronAPI.loadFile(projectPath)
    return !!content
}

async function attemptToOpenPathProject() {
    if (!(await isProjectValid(projectPath))) {
        router.push({ path: '/projects' })
        return
    }

    router.push({ path: '/load' })
}

onMounted(attemptToOpenPathProject)
</script>
<template>
    <div>Loading...</div>
</template>

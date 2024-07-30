<template>
    <q-card-section>
        <div class="text-h6">Recent</div>
    </q-card-section>
    <q-card-actions vertical align="left" v-for="item in recentProjects" :key="item.path">
        <q-btn push class="full-width" align="left" no-caps @click="onClickProject(item.path)">{{ item.label }}</q-btn>
    </q-card-actions>
</template>
<script lang="ts" setup>
import { getRecentProjects } from '../../services/config-service';
import { useRouter } from 'vue-router'
import { projectConfigStore } from '../../stores/project-config-store.js';
const router = useRouter()

function formatProjectName(projectPath: string) {
    const parts = projectPath.replace('.martelo', '').split('\\')
    if (parts.length <= 2) {
        return parts.join('/')
    }
    return `.../${parts.at(-2)}/${parts.at(-1)}`

}

async function formatRecentProjects() {
    const projects = await getRecentProjects()
    return projects.map(project => ({
        label: formatProjectName(project),
        path: project
    }))
}

function onClickProject(path: string) {
    projectConfigStore.setProject(path)
    router.push({ path: '/gallery' })
}

const recentProjects = await formatRecentProjects()

</script>
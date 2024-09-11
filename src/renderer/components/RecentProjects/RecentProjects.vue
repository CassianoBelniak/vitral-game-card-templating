<script lang="ts" setup>
    import { getRecentProjects } from '../../services/config-service';
    import { useRouter } from 'vue-router'
    import { projectConfigStore } from '../../stores/project-config-store.js';
    import { assertProjectStructure } from '../../helpers/file-handling/assert-project-structure.js';
    import { watchFileChanges } from '../../helpers/file-handling/watch-file-changes.js';
    const router = useRouter()

    function formatProjectName(projectPath: string) {
        const parts = projectPath.replace('.martelo', '').split('/')
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
        assertProjectStructure(projectConfigStore.workingDirectory)
        watchFileChanges(projectConfigStore.workingDirectory)
        setTimeout(() => {
            router.push({ path: '/gallery' })
        }, 500)
    }

    const recentProjects = await formatRecentProjects()

</script>
<template>
    <q-card-section>
        <div class="text-h6">Recent</div>
    </q-card-section>
    <q-card-actions vertical align="left" v-for="item in recentProjects" :key="item.path">
        <q-btn push align="left" no-caps @click="onClickProject(item.path)">{{ item.label }}</q-btn>
    </q-card-actions>
</template>
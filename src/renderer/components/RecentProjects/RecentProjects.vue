<script lang="ts" setup>
    import { addRecentProject, getRecentProjects, removeRecentProject } from '../../services/config-service';
    import { useRouter } from 'vue-router'
    import { projectConfigStore } from '../../stores/project-config-store.js';
    import { assertProjectStructure } from '../../helpers/file-handling/assert-project-structure.js';
    import { watchFileChanges } from '../../helpers/file-handling/watch-file-changes.js';
    import { ref } from 'vue';
    import resetStores from '../../helpers/reset-stores.js';
    const router = useRouter()
    const recentProjects = ref<{
        label: string
        path: string
    }[]>([])
    const alertOpen = ref(false)

    function formatProjectName(projectPath: string) {
        const parts = projectPath.replace('.vitral', '').split('/')
        if (parts.length <= 2) {
            return parts.join('/')
        }
        return `.../${parts.at(-2)}/${parts.at(-1)}`

    }

    async function removeProject(projectPath: string) {
        await removeRecentProject(projectPath)
        updateList()
    }

    async function formatRecentProjects() {
        const projects = await getRecentProjects()
        return projects.map(project => ({
            label: formatProjectName(project),
            path: project
        }))
    }

    async function isProjectValid(projectPath: string) {
        const content = await window.electronAPI.loadFile(projectPath)
        return !!content
    }

    async function onClickProject(path: string) {
        if (! await isProjectValid(path)) {
            await removeProject(path)
            alertOpen.value = true
            return
        }
        resetStores()
        projectConfigStore.setProject(path)
        addRecentProject(path)
        assertProjectStructure(projectConfigStore.workingDirectory)
        watchFileChanges(projectConfigStore.workingDirectory)
        setTimeout(() => {
            router.push({ path: '/cards' })
        }, 500)
    }

    async function updateList() {
        const list = await formatRecentProjects()
        recentProjects.value = list
    }

    updateList()

</script>
<template>
    <div class="text-h6 mb-2">Recent</div>
    <div vertical align="left" v-for="item in recentProjects" :key="item.path">
        <q-btn class="load-button" push align="left" no-caps @click="onClickProject(item.path)">{{ item.label
            }}</q-btn>
        <q-btn push align="left" no-caps @click="removeProject(item.path)" icon="remove">
            <q-tooltip>
                Remove project from recents
            </q-tooltip>
        </q-btn>
    </div>
    <alert-dialog v-model="alertOpen" title="Can't open project"
        content="It seems the projects was moved or don't exists anymore" />
</template>
<style lang="scss" scoped>
    .load-button {
        width: 300px;
    }
</style>
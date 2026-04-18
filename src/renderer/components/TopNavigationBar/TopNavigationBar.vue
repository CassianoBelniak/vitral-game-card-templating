<script setup>
import { useRoute } from 'vue-router'
import { projectConfigStore } from '../../stores/project-config-store'

const route = useRoute()

const currentProject = projectConfigStore.projectName
const isNavigationDisabled = !currentProject

const buttons = [
    {
        label: 'Projects',
        route: '/projects',
        icon: 'folder',
    },
    {
        label: 'Cards',
        route: '/cards',
        icon: 'photo',
    },

    {
        label: 'Templates',
        route: '/templates',
        icon: 'code',
    },
    {
        label: 'Assets',
        route: '/assets',
        icon: 'burst_mode',
    },
    {
        label: 'Exporting',
        route: '/export',
        icon: 'cloud_download',
    },
    {
        label: 'Configs',
        route: '/configs',
        icon: 'settings',
    },
]
</script>
<template>
    <div class="q-pa-md">
        <q-toolbar>
            <q-btn
                v-for="button in buttons"
                :key="button.route"
                class="button"
                no-caps
                push
                :icon="button.icon"
                :label="button.label"
                :to="button.route"
                :disable="isNavigationDisabled || button.route === route.path"
                :color="route.path === button.route ? 'primary' : ''"
            />
        </q-toolbar>
    </div>
</template>
<style lang="scss" scoped>
.button {
    margin-right: 10px;
}
</style>

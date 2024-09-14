<script setup>
import { projectConfigStore } from '../../stores/project-config-store';

const currentProject = projectConfigStore.projectName
const isNavigationDisabled = !currentProject

</script>
<template>
    <div class="q-pa-md">
        <q-toolbar>
            <q-btn class="button" no-caps push icon="home" label="Home" to="/" />
            <q-btn class="button" no-caps push icon="settings" label="Configs" to="/configs"
                :disable="isNavigationDisabled" />
            <q-btn class="button" no-caps push icon="photo" label="Cards" to="/cards" :disable="isNavigationDisabled" />
            <q-btn class="button" no-caps push icon="code" label="Templates" to="/templates"
                :disable="isNavigationDisabled" />
            <q-btn class="button" no-caps push icon="burst_mode" label="Assets" to="/assets"
                :disable="isNavigationDisabled" />
            <q-btn class="button" no-caps push icon="cloud_download" label="Exporting" to="/export"
                :disable="isNavigationDisabled" />
        </q-toolbar>
    </div>
</template>
<style lang="scss" scoped>
    .button {
        margin-right: 10px;
    }
</style>
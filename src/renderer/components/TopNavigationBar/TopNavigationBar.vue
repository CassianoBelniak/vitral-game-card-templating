<script setup>
import { projectConfigStore } from '../../stores/project-config-store';

const currentProject = projectConfigStore.projectName
const isNavigationDisabled = !currentProject

</script>
<template>
    <div class="q-pa-md">
        <q-toolbar>
            <q-btn push icon="home" label="Home" to="/" />
            <q-btn push icon="settings" label="Configs" to="/configs" :disable="isNavigationDisabled" />
            <q-btn push icon="photo" label="Gallery" to="/gallery" :disable="isNavigationDisabled" />
            <q-btn push icon="code" label="Templates" to="/templates" :disable="isNavigationDisabled" />
            <q-btn push icon="burst_mode" label="Assets" to="/assets" :disable="isNavigationDisabled" />
            <q-btn push icon="cloud_download" label="Exporting" to="/export" :disable="isNavigationDisabled" />
        </q-toolbar>
    </div>
</template>
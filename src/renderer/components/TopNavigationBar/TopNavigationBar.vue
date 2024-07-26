<script setup>
import { fileStore } from '../../stores/file-store.ts';

const currentProject = fileStore.projectName
const isNavigationDisabled = !currentProject

</script>
<template>
    <div class="q-pa-md">
        <q-toolbar>
            <q-btn push label="Home" to="/" />
            <q-btn push label="Configs" to="/configs" :disable="isNavigationDisabled" />
            <q-btn push label="Gallery" to="gallery" :disable="isNavigationDisabled" />
            <q-btn push label="Templates" to="/templates" :disable="isNavigationDisabled" />
            <q-btn push label="Assets" to="/assets" :disable="isNavigationDisabled" />
            <q-btn push label="Exporting" to="/export" :disable="isNavigationDisabled" />
        </q-toolbar>
    </div>
</template>
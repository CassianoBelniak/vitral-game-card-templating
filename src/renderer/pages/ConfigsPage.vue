<script lang="ts" setup>
import ContentPad from '../components/ContentPad/ContentPad.vue';
import SizeInput from '../components/SizeInput/SizeInput.vue';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar.vue';
import { projectConfigStore } from '../stores/project-config-store';

function onWidthChange(value: string) {
    projectConfigStore.setConfigs({ width: value })
}

function onHeightChange(value: string) {
    projectConfigStore.setConfigs({ height: value })
}

function onPpiChange(value: string) {
    projectConfigStore.setConfigs({ ppi: parseInt(value) })
}

</script>
<template>
    <TopNavigationBar />
    <ContentPad>
        <q-card class="my-card">
            <q-card-section>
                <div class="text-h6">Card dimensions</div>
                <div class="flex">
                    <SizeInput label="Width" :value="projectConfigStore.width" @on-change="onWidthChange" />
                    <div class="text-h6 x-label">X</div>
                    <SizeInput label="Height" :value="projectConfigStore.height" @on-change="onHeightChange" />
                </div>
            </q-card-section>
            <q-card-section>
                <div class="text-h6">Card quality</div>
                <q-input dense label="PPI" outlined type="number" v-model="projectConfigStore.ppi"
                    @update:modelValue="onPpiChange" />
            </q-card-section>
        </q-card>
    </ContentPad>
</template>
<style>
.x-label {
    padding: 10px;
    margin-top: 2px;
}
</style>
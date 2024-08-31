<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { exportPipelinesStore } from '../stores/export-pipeline-store.js';
import { ref } from 'vue';
import duplicatePipeline from '../helpers/duplicate-pipeline.js';

const route = useRoute();
const pipelineName = route.query.pipelineName?.toString() || '';
const originalPipeline = exportPipelinesStore.exportPipelines[pipelineName];

const pipeline = ref(duplicatePipeline(originalPipeline));

function saveTemplate() {
    if (pipeline.value.name !== pipelineName) {
        exportPipelinesStore.removeExportPipeline(pipelineName)
    }
    exportPipelinesStore.setExportPipeline(pipeline.value.name, pipeline.value)
}

</script>

<template>
    <ContentPad>
        <div class="column container">
            <div class="col-auto">
                <q-btn push icon="arrow_back" align="left" to="/export" no-caps>Back to export</q-btn>
            </div>
            <div class="col row">
                <q-input v-model="pipeline.name" label="Name" outlined dense />

            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn push to="/export" color="primary" @click="saveTemplate">Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
.container {
    height: 100%;
    max-width: 100%;
}
</style>
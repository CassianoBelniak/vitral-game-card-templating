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

<template lang="pug">
ContentPad
    .column.container
        .col-auto
            q-btn(push icon="arrow_back" align="left" to="/export" no-caps) Back to export
        .col.row
            q-card.p-2.my-2.col-auto
                pipeline-options(v-model='pipeline')
        .col-auto.row.justify-end.content-start
            q-btn(push to="/export" color="primary" @click="saveTemplate") Save
</template>

<style lang="scss" scoped>
    .container {
        height: 100%;
        max-width: 100%;
    }

    .settings-container {
        width: 400px;
    }

    .card-container {
        flex: 1;
        position: relative;
        max-height: 100%;
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
</style>
<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { exportPipelinesStore } from '../stores/export-pipeline-store.js';
    import { onMounted, ref, watch } from 'vue';
    import duplicatePipeline from '../helpers/duplicate-pipeline.js';
    import { ExportService } from '../services/export-service.js';
    import delay from '../helpers/delay.js';

    const isExporting = ref(false)
    const pageGenerator = ref<AsyncGenerator<HTMLCanvasElement, void, void> | null>()
    const route = useRoute();
    const pageContainer = ref<HTMLDivElement>();
    const pipelineName = route.query.pipelineName?.toString() || '';
    const originalPipeline = exportPipelinesStore.exportPipelines[pipelineName];

    const pipeline = ref(duplicatePipeline(originalPipeline));

    function saveTemplate() {
        if (pipeline.value.name !== pipelineName) {
            exportPipelinesStore.removeExportPipeline(pipelineName)
        }
        exportPipelinesStore.setExportPipeline(pipeline.value.name, pipeline.value)
    }

    async function updatePages() {
        if (pageGenerator.value) pageGenerator.value.return()
        pageGenerator.value = await ExportService.renderCanvas(pipeline.value, 60)
        await delay(500)
        pageContainer.value!.innerHTML = ''
        if (!pageGenerator.value) return;
        for await (const page of pageGenerator.value) {
            pageContainer.value?.appendChild(page)
        }
    }

    async function exportPages() {
        isExporting.value = true
        await ExportService.exportPages(pipeline.value)
        setTimeout(() => isExporting.value = false, 2000)
    }


    onMounted(updatePages)
    watch(pipeline, updatePages, { deep: true })

</script>

<template>
    <ContentPad>
        <div class="column container">
            <div class="col-auto">
                <q-btn push icon="arrow_back" align="left" to="/export" no-caps>Back to export</q-btn>
            </div>
            <div class="col row">
                <q-card class="p-2 my-2 options">
                    <pipeline-options v-model="pipeline"></pipeline-options>
                </q-card>
                <q-scroll-area class="col h-full">
                    <div class="col page-container m-2 fit row wrap justify-start items-start content-start"
                        ref="pageContainer"></div>
                </q-scroll-area>
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn class="mr-3" :loading="isExporting" push @click="exportPages" no-caps>Export</q-btn>
                <q-btn push to="/export" color="primary" @click="saveTemplate" no-caps>Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>

<style lang="scss" scoped>
    .container {
        height: 100%;
        max-width: 100%;
    }

    .options {
        width: 400px;
    }

    .page-container * {
        width: 20%;
        margin-right: 10px;
        margin-bottom: 10px;
        background-image: url('/checkboard.svg');
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
<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { exportPipelinesStore } from '../stores/export-pipeline-store.js';
    import { onMounted, ref, watch } from 'vue';
    import duplicatePipeline from '../helpers/duplicate-pipeline.js';
    import { ExportService } from '../services/export-service.js';
    import { cardStore } from '../stores/cards-store.js';

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
        const pages = await ExportService.renderCanvas(pipeline.value, Object.values(cardStore.cards))
        pageContainer.value!.innerHTML = ''
        for (const page of pages) {
            pageContainer.value?.appendChild(page)
        }
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
                <q-card class="p-2 my-2 col-auto">
                    <pipeline-options v-model="pipeline"></pipeline-options>
                </q-card>
                <div class="col page-container m-2" ref="pageContainer"></div>
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn class="mr-3" push>Export</q-btn>
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
<script lang="ts" setup>
    import { onBeforeRouteLeave, useRoute } from 'vue-router';
    import { exportPipelinesStore } from '../stores/export-pipeline-store.js';
    import { computed, onMounted, ref, watch } from 'vue';
    import duplicatePipeline from '../helpers/duplicate-pipeline.js';
    import { ExportService } from '../services/export-service.js';
    import delay from '../helpers/delay.js';
    import { useQuasar } from 'quasar';
    import { isEqual } from 'lodash'
    import { ExportedPage } from '../typings/page.js';
    import getPageFilename from '../helpers/get-page-filename.js';
    import { projectConfigStore } from '../stores/project-config-store.js';
    import isValidName from '../helpers/validators/is-valid-name.js';

    const $q = useQuasar()

    const isExporting = ref(false)
    const pageGenerator = ref<AsyncGenerator<ExportedPage, void, void> | null>()
    const route = useRoute();
    const pageContainer = ref<HTMLDivElement>();
    const pipelineName = route.query.pipelineName?.toString() || '';
    const originalPipeline = exportPipelinesStore.exportPipelines[pipelineName];
    const cardSize = computed(() => `${projectConfigStore.filters.editExport.cardSize}px`)

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
        let counter = 0
        for await (const page of pageGenerator.value) {
            counter += 1
            const fileName = getPageFilename({ page, pipeline: pipeline.value, counter, ext: pipeline.value.extension })
            if (!fileName.includes(projectConfigStore.filters.editExport.searchText)) {
                continue
            }
            const div = document.createElement('div')
            div.classList.add('page-canvas-container')
            const textDiv = document.createElement('div')
            textDiv.innerText = fileName
            textDiv.classList.add('w-full', 'truncate')
            page.canvas.classList.add('page-canvas')
            div.appendChild(page.canvas)
            div.appendChild(textDiv)
            pageContainer.value?.appendChild(div)
        }
    }

    async function exportPages() {
        isExporting.value = true
        await ExportService.exportPages(pipeline.value)
        setTimeout(() => isExporting.value = false, 2000)
    }

    const isValid = computed(() => !!pipeline.value.name && isValidName(pipeline.value.name))

    onBeforeRouteLeave(() => {
        if (isEqual(pipeline.value, originalPipeline)) return true
        return new Promise(resolve => {
            $q.dialog({
                title: 'Unsaved changes',
                message: `Are you sure you want to leave? There are unsaved changes.`,
                cancel: true,
            }).onOk(() => {
                resolve(true)
            }).onCancel(() => resolve(false))
                .onDismiss(() => resolve(false))
        })
    })


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
                    <pipeline-options v-model="pipeline" />
                </q-card>
                <div class="column col h-full w-full">
                    <Filterbar class="my-2 ml-3 p-2" v-model:cardSize="projectConfigStore.filters.editExport.cardSize"
                        v-model:searchText="projectConfigStore.filters.editExport.searchText"
                        @filterChanged="updatePages" />
                    <q-scroll-area class="col h-full w-full">
                        <div class="col page-container m-3 fit row wrap justify-start items-start content-start"
                            ref="pageContainer"></div>
                    </q-scroll-area>
                </div>
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn class="mr-3" :loading="isExporting" push @click="exportPages" no-caps>Export</q-btn>
                <q-btn push to="/export" color="primary" :disable="!isValid" @click="saveTemplate" no-caps>Save</q-btn>
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
        width: 390px;
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
<style lang="scss">
    .page-canvas-container {
        width: v-bind('cardSize');
        margin-bottom: 12px;
        margin-right: 12px;
    }

    .page-canvas {
        width: 100%;
        margin-right: 10px;
        margin-bottom: 10px;
        background-image: url('/checkboard.svg');
    }
</style>
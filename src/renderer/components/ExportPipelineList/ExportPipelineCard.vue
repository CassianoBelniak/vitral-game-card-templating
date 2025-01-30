<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ExportService } from '../../services/export-service.js'
import { ExportPipeline } from '../../typings/export.js'
import { ref } from 'vue'
import { exportTypes } from '../../helpers/export-settings.js'
import { exportPipelinesStore } from '../../stores/export-pipeline-store.js'
import duplicatePipeline from '../../helpers/duplicate-pipeline.js'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const isExporting = ref(false)

const props = defineProps<{
    pipeline: ExportPipeline
}>()
const router = useRouter()

const goToPipelineEdit = (pipelineName: string) => {
    router.push({ name: 'EditExportPipeline', query: { pipelineName } })
}

function getExportTypeLabel(value: string) {
    const exportType = exportTypes.find((item) => item.value === value)
    return exportType?.label
}

async function runExport(pipeline: ExportPipeline) {
    $q.dialog({
        title: 'Run pipeline?',
        message: `Are you sure you want to run ${pipeline.name} export pipeline? Files from the destination folder may be deleted.`,
        cancel: true,
    }).onOk(() => {
        isExporting.value = true
        ExportService.exportPages(pipeline).then(() => {
            setTimeout(() => (isExporting.value = false), 2000)
        })
    })
}

function onDuplicatePipeline(pipeline: string) {
    const copy = duplicatePipeline(exportPipelinesStore.exportPipelines[pipeline])
    copy.name += '_copy'
    exportPipelinesStore.setExportPipeline(copy.name, copy)
}

function onRemovePipeline(pipelineName: string) {
    $q.dialog({
        title: 'Delete?',
        message: `Are you sure you want to delete ${pipelineName}`,
        cancel: true,
    }).onOk(() => {
        exportPipelinesStore.removeExportPipeline(pipelineName)
    })
}
</script>

<template>
    <q-card class="template-card">
        <q-card-section class="bg-primary text-white" @click="goToPipelineEdit(props.pipeline.name)">
            <strong>{{ props.pipeline.name }}</strong>
            <div>{{ getExportTypeLabel(props.pipeline.exportType) }}</div>
            <div>{{ props.pipeline.destination }} - {{ props.pipeline.extension }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn icon="delete" flat round @click="onRemovePipeline(pipeline.name)" />
            <q-btn icon="content_copy" flat round @click="onDuplicatePipeline(pipeline.name)" />
            <q-btn icon="play_arrow" :loading="isExporting" flat round @click="runExport(props.pipeline)" />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import { ExportService } from '../../services/export-service.js';
    import { ExportPipeline } from '../../typings/export.js';
    import { ref } from 'vue';
    import { exportTypes } from '../../helpers/export-settings.js';

    const isExporting = ref(false)

    const props = defineProps<{
        pipeline: ExportPipeline
    }>()
    const router = useRouter();

    const goToPipelineEdit = (pipelineName: string) => {
        router.push({ name: 'EditExportPipeline', query: { pipelineName } })
    };

    function getExportTypeLabel(value: string) {
        const exportType = exportTypes.find(item => item.value === value)
        return exportType?.label
    }

    async function runExport(pipeline: ExportPipeline) {
        isExporting.value = true
        await ExportService.exportPages(pipeline)
        setTimeout(() => isExporting.value = false, 2000)
    }
</script>

<template>
    <q-card class="template-card">
        <q-card-section class="bg-primary text-white">
            <strong>{{ props.pipeline.name }}</strong>
            <div>{{ getExportTypeLabel(props.pipeline.exportType) }}</div>
            <div>{{ props.pipeline.destination }} - {{ props.pipeline.extension }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn icon="edit" flat no-caps @click="goToPipelineEdit(props.pipeline.name)">Edit</q-btn>
            <q-btn icon="play_arrow" :loading="isExporting" flat no-caps @click="runExport(props.pipeline)"
                label="Export" />
        </q-card-actions>
    </q-card>
</template>
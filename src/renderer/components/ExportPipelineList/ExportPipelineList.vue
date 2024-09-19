<script lang="ts" setup>

    import { useRouter } from 'vue-router';

    import { exportPipelinesStore } from '../../stores/export-pipeline-store.js';
    import { exportTypes } from '../../helpers/export-settings.js';
    import { ExportPipeline } from '../../typings/export.js';
    import { ExportService } from '../../services/export-service.js';
    import { cardStore } from '../../stores/cards-store.js';
    import { ref } from 'vue';

    const isExporting = ref(false)

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
        await ExportService.exportPages(pipeline, Object.values(cardStore.cards))
        setTimeout(() => isExporting.value = false, 2000)
    }

</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(pipeline, index) in exportPipelinesStore.exportPipelines" :key="index">
            <q-card class="template-card">
                <q-card-section class="bg-primary text-white">
                    <strong>{{ pipeline.name }}</strong>
                    <div>{{ getExportTypeLabel(pipeline.exportType) }}</div>
                    <div>{{ pipeline.destination }} - {{ pipeline.extension }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn icon="edit" flat no-caps @click="goToPipelineEdit(pipeline.name)">Edit</q-btn>
                    <q-btn icon="play_arrow" :loading="isExporting" flat no-caps @click="runExport(pipeline)"
                        label="Export" />
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
    .card-container {
        margin-bottom: 30px;
    }

    .template-card {
        margin-right: 20px;
        cursor: pointer;
    }
</style>
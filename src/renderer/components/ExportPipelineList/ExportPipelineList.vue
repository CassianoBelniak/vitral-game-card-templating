<script lang="ts" setup>

import { useRouter } from 'vue-router';

import { exportPipelinesStore } from '../../stores/export-pipeline-store.js';

const router = useRouter();

const goToPipelineEdit = (pipelineName: string) => {
    router.push({ name: 'EditExportPipeline', query: { pipelineName } })
};

</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(pipeline, index) in exportPipelinesStore.exportPipelines" :key="index">
            <q-card class="template-card" @click="goToPipelineEdit(pipeline.name)">
                <q-card-section>
                    <div>{{ pipeline.name }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}

.template-card {
    height: 150px;
    margin-right: 20px;
    cursor: pointer;
}
</style>
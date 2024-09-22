<script lang="ts" setup>
    import { exportPipelinesStore } from '../../stores/export-pipeline-store.js';
</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(pipeline, index) in exportPipelinesStore.exportPipelines" :key="index">
            <export-pipeline-card :pipeline="pipeline"></export-pipeline-card>
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
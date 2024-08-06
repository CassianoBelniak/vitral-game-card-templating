<script lang="ts" setup>
import { templatesStore } from '../../stores/templates-store.js';

</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(template, index) in templatesStore.templates" :key="index">
            <q-card class="template-card">
                <q-card-section>
                    <div class="text-subtitle2">{{ template.name }}</div>
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
}
</style>
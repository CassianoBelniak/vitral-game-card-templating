<script lang="ts" setup>
import { templatesStore } from '../../stores/templates-store.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToTemplateEdit = (templateName: string) => {
    router.push({ name: 'EditTemplate', query: { templateName } })
};
</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(template, index) in templatesStore.templates" :key="index">
            <q-card class="template-card" @click="goToTemplateEdit(template.name)">
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
    cursor: pointer;
}
</style>
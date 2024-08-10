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
                <q-card-section class="image">
                    <Fit>
                        <RenderedTemplate class="template" :template="template" />
                    </Fit>
                </q-card-section>
                <q-card-section>
                    <div>{{ template.name }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}

.image {
    width: 100%;
    height: 50%;
}
.template-card {
    height: 150px;
    margin-right: 20px;
    cursor: pointer;
}
</style>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { templatesStore } from '../stores/templates-store.js';
import { ref } from 'vue';
import duplicateTemplate from '../helpers/duplicate-template.js';

const route = useRoute();
const templateName = route.query.templateName?.toString() || '';
const originalTemplate = templatesStore.templates[templateName];
const template = ref(duplicateTemplate(originalTemplate));

function saveTemplate() {
    if (template.value.name !== templateName) {
        templatesStore.removeTemplate(templateName)
    }
    templatesStore.setTemplate(template.value.name, template.value)
}


//TODO: Add validations
</script>

<template>
    <ContentPad>
        <q-card-section class="row justify-between items-center">
            <q-btn push icon="arrow_back" align="left" to="/templates" no-caps>Back to templates</q-btn>
        </q-card-section>
        <q-card-section>
            <div class="row">
                <div class="settings-container">
                    <q-input v-model="template.name" label="Name" dense />
                    <ComponentList v-model="template" />
                </div>
                <div class="card-container">
                    <!-- <RenderedTemplate class="template" :template="template" /> -->
                </div>
            </div>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn push to="/templates" color="primary" @click="saveTemplate">Save</q-btn>
        </q-card-actions>
    </ContentPad>
</template>
<style lang="scss" scoped>
.settings-container {
    background-color: red;
    width: 400px;
}

.card-container {
    flex: 1;
    background-color: green;
}

.template {
    transform: scale(0.5);
    background-color: blue;
}
</style>
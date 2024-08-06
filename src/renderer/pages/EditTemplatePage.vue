<script lang="ts" setup>
import { useRoute } from 'vue-router';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar.vue';
import { templatesStore } from '../stores/templates-store.js';
import { ref } from 'vue';
import duplicateTemplate from '../helpers/duplicate-template.js';

const route = useRoute();
const templateName = route.params.templateName?.toString() || '';
const originalTemplate = templatesStore.templates[templateName];
const template = ref(duplicateTemplate(originalTemplate));

function saveTemplate() {
    templatesStore.removeTemplate(templateName)
    templatesStore.setTemplate(template.value.name, template.value)
}

</script>

<template>
    <TopNavigationBar />
    <ContentPad>
        <q-card class="card-container">
            <q-card-section class="row justify-between items-center">
                <q-btn push icon="arrow_back" align="left" to="/templates" no-caps>Back to templates</q-btn>
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div>
                        <q-input v-model="template.name" label="Name" dense />
                    </div>
                    <div>
                        <RenderedTemplate :template="template" />
                        <q-btn push color="primary" to="/templates" @click="saveTemplate">Save</q-btn>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </ContentPad>
</template>
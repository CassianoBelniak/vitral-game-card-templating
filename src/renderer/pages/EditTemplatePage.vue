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

                    </div>
                    <div>
                        <RenderedTemplate :template="template" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </ContentPad>
</template>
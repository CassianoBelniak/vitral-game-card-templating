<script lang="ts" setup>
import { useRoute } from 'vue-router';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar.vue';
import { templatesStore } from '../stores/templates-store.js';
import { ref } from 'vue';
import duplicateTemplate from '../helpers/duplicate-template.js';
import ComponentRectangle from '../classes/ComponentRectangle.js';

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

function createRectangleComponent() {
    const component = new ComponentRectangle()
    template.value.components.push(component)
}

//TODO: Add validations
</script>

<template>
    <TopNavigationBar />
    <ContentPad>
        <q-card>
            <q-card-section class="row justify-between items-center">
                <q-btn push icon="arrow_back" align="left" to="/templates" no-caps>Back to templates</q-btn>
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="settings-container">
                        <q-input v-model="template.name" label="Name" dense />
                        <div>Components</div>
                        <div v-for="component in template.components" :key="component.id">
                            <TemplateComponentEditor :component="component" />
                        </div>
                        <q-btn-dropdown icon="add" label="Add component">
                            <q-list>
                                <q-item clickable v-close-popup @click="createRectangleComponent">
                                    <q-item-section>
                                        <q-item-label>Rectangle</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                    <div class="card-container">
                        <RenderedTemplate :template="template" />
                        <q-btn push to="/templates" @click="saveTemplate">Save</q-btn>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </ContentPad>
</template>
<style lang="scss" scoped>
.settings-container {
    background-color: red;
}

.card-container {
    background-color: green;
}
</style>
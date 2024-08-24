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
//TODO: Add a way to delete a component
//TODO: Add a message when template is not saved
//TODO: Add a way to sort components
//TODO: add a way to minimize the component card
</script>

<template>
    <ContentPad>
        <div class="column container">
            <div class="col-auto">
                <q-btn push icon="arrow_back" align="left" to="/templates" no-caps>Back to templates</q-btn>
            </div>
            <div class="col row">
                <div class="settings-container">
                    <TemplateComponents v-model="template" />
                </div>
                <div class="card-container">
                    <Fit>
                        <RenderedTemplate class="template" :template="template" />
                    </Fit>
                </div>
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn push to="/templates" color="primary" @click="saveTemplate">Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
}

.settings-container {
    width: 400px;
}

.card-container {
    flex: 1;
    position: relative;
    max-height: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

</style>
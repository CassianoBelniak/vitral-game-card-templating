<script lang="ts" setup>
import { computed, ref } from 'vue';
import duplicateCard from '../../helpers/duplicate-card.js';
import { Card } from '../../typings/card.js';
import { templatesStore } from '../../stores/templates-store.js';

const model = defineModel<Card>({ default: duplicateCard(undefined) })
const newFrontSideTemplateName = ref('')
const newBackSideTemplateName = ref('')
const variableNames = computed(() => {
    const variables = []
    for (const templateName of [...model.value.frontsideTemplates, ...model.value.backsideTemplates]) {
        const template = templatesStore.templates[templateName]
        variables.push(...template.getVariables())
    }
    return variables
}
)

const templateNames = computed(() => Object.keys(templatesStore.templates))

function addFrontSideTemplate() {
    if (newFrontSideTemplateName.value === '') {
        return
    }
    model.value.frontsideTemplates.push(newFrontSideTemplateName.value)
    newFrontSideTemplateName.value = ''
}

function addBackSideTemplate() {
    if (newBackSideTemplateName.value === '') {
        return
    }
    model.value.backsideTemplates.push(newBackSideTemplateName.value)
    newBackSideTemplateName.value = ''
}

function removeFrontSideTemplate(templateName: string) {
    model.value.frontsideTemplates = model.value.frontsideTemplates.filter((name) => name !== templateName)
}

function removeBackSideTemplate(templateName: string) {
    model.value.backsideTemplates = model.value.backsideTemplates.filter((name) => name !== templateName)
}


</script>
<template>
    <q-scroll-area class="h-full">
        <q-card class="p-2 my-2">
            <div>General</div>
            <q-input v-model="model.name" label="Name" dense />
        </q-card>
        <q-card class="p-2 my-2" v-if="variableNames.length > 0">
            <div>Variables</div>
            <template v-for="variable in variableNames" :key="variable">
                <AutocompleteInput :includeFonts="true" :includeImages="true" v-model="model.variables[variable]"
                    :label="variable" />
            </template>
        </q-card>
        <q-card class="p-2 my-2">
            <div>Front side templates</div>
            <div class="row">
                <q-select class="col" v-model="newFrontSideTemplateName" :options="templateNames" label="Add template"
                    dense />
                <q-btn class="col-auto" push color="primary" @click="addFrontSideTemplate">Add</q-btn>
            </div>
            <template v-for="templateName in model.frontsideTemplates" :key="templateName">
                <div class="row">
                    <div class="col">{{ templateName }}</div>
                    <q-btn class="col-auto" push color="primary"
                        @click="removeFrontSideTemplate(templateName)">Remove</q-btn>
                </div>
            </template>
        </q-card>
        <q-card class="p-2 my-2">
            <div>Back side templates</div>
            <div class="row">
                <q-select class="col" v-model="newBackSideTemplateName" :options="templateNames" label="Add template"
                    dense />
                <q-btn class="col-auto" push color="primary" @click="addBackSideTemplate">Add</q-btn>
            </div>
            <template v-for="templateName in model.backsideTemplates" :key="templateName">
                <div class="row">
                    <div class="col">{{ templateName }}</div>
                    <q-btn class="col-auto" push color="primary"
                        @click="removeBackSideTemplate(templateName)">Remove</q-btn>
                </div>
            </template>
        </q-card>
    </q-scroll-area>
</template>

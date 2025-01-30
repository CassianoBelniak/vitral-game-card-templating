<script lang="ts" setup>
import { computed, ref } from 'vue'
import duplicateCard from '../../helpers/duplicate-card.js'
import { Card } from '../../typings/card.js'
import { templatesStore } from '../../stores/templates-store.js'
import CardComponentEditor from './CardComponentEditor/CardComponentEditor.vue'
import getAllTags from '../../helpers/get-all-tags.js'
import getAllCardFiles from '../../helpers/get-all-card-files.js'
import removeInvalidCharsFromFilename from '../../helpers/remove-invalid-chars-from-filename.js'

const availableTags = ref<string[]>(getAllTags())
const availableFiles = ref<string[]>(getAllCardFiles())

const model = defineModel<Card>({ default: duplicateCard(undefined) })

const variableNames = computed(() => {
    const variables: string[] = []
    for (const templateName of [...model.value.frontsideTemplates, ...model.value.backsideTemplates]) {
        const template = templatesStore.templates[templateName]
        if (!template) continue
        for (const variable of template.getVariables()) {
            if (!variables.includes(variable)) {
                variables.push(variable)
            }
        }
    }
    return variables
})

function createTagValue(val: string, done: (item: string, mode: string) => void) {
    if (val.length > 0) {
        if (!availableTags.value.includes(val)) {
            availableTags.value.push(val)
        }
        done(val, 'toggle')
    }
}

function createFileValue(val: string, done: (item: string, mode: string) => void) {
    if (val.length > 0) {
        const file = removeInvalidCharsFromFilename(val.trim().replace('.csv', '') + '.csv')
        if (!availableFiles.value.includes(file)) {
            availableFiles.value.push(file)
        }
        done(file, 'toggle')
    }
}

function filterTags(val: string, update: (a: () => void) => void) {
    update(() => {
        if (val === '') {
            availableTags.value = getAllTags()
        } else {
            const needle = val.toLowerCase()
            availableTags.value = getAllTags().filter((v) => v.toLowerCase().indexOf(needle) > -1)
        }
    })
}

function filterFiles(val: string, update: (a: () => void) => void) {
    update(() => {
        if (val === '') {
            availableFiles.value = getAllCardFiles()
        } else {
            const needle = val.toLowerCase()
            availableFiles.value = getAllCardFiles().filter((v) => v.toLowerCase().indexOf(needle) > -1)
        }
    })
}
</script>
<template>
    <q-scroll-area class="h-full">
        <q-card class="p-2 my-2">
            <div>General</div>
            <q-input class="mb-2" v-model="model.name" dense outlined />
            <q-select
                use-input
                @filter="filterTags"
                @new-value="createTagValue"
                class="mb-2 col-auto tags"
                dense
                outlined
                label="Tags"
                v-model="model.tags"
                multiple
                :options="availableTags"
                use-chips
                stack-label
            />
            <q-select
                use-input
                @filter="filterFiles"
                @new-value="createFileValue"
                class="mb-2 col-auto tags"
                dense
                outlined
                label="Source file"
                v-model="model.source"
                :options="availableFiles"
                use-chips
                stack-label
            />
            <q-input v-model="model.ammount" type="number" label="Ammount" dense outlined />
        </q-card>
        <q-card class="p-2 my-2" v-if="variableNames.length > 0">
            <div>Variables</div>
            <AutocompleteInput
                class="mb-2"
                :includeFonts="true"
                :includeImages="true"
                :include-colors="true"
                :include-icons="true"
                v-model="model.variables[variable]"
                :label="variable"
                v-for="variable in variableNames"
                :key="variable"
            />
        </q-card>
        <q-card class="p-2 my-2">
            <CardComponentEditor label="Frontside templates" v-model="model.frontsideTemplates" :card-id="model.id" />
        </q-card>
        <q-card class="p-2 my-2">
            <CardComponentEditor label="Backside templates" v-model="model.backsideTemplates" :card-id="model.id" />
        </q-card>
    </q-scroll-area>
</template>

<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import duplicateCard from '../../helpers/duplicate-card.js';
    import { Card } from '../../typings/card.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import CardComponentEditor from './CardComponentEditor/CardComponentEditor.vue';
    import { cardStore } from '../../stores/cards-store.js';

    const availableTags = ref<string[]>(cardStore.getAllCardTags())

    const model = defineModel<Card>({ default: duplicateCard(undefined) })
    const variableNames = computed(() => {
        const variables: string[] = []
        for (const templateName of [...model.value.frontsideTemplates, ...model.value.backsideTemplates]) {
            const template = templatesStore.templates[templateName]
            for (const variable in template.getVariables()) {
                if (!variables.includes(variable)) {
                    variables.push(variable)
                }
            }
        }
        return variables
    }
    )

    function createValue(val: string, done: (item: string, mode: string) => void) {
        // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 0) {
            if (!availableTags.value.includes(val)) {
                availableTags.value.push(val)
            }
            done(val, 'toggle')
        }
    }

    function filterFn(val: string, update: (a: () => void) => void) {
        update(() => {
            if (val === '') {
                availableTags.value = cardStore.getAllCardTags()
            }
            else {
                const needle = val.toLowerCase()
                availableTags.value = cardStore.getAllCardTags().filter(
                    v => v.toLowerCase().indexOf(needle) > -1
                )
            }
        })
    }


</script>
<template>
    <q-scroll-area class="h-full">
        <q-card class="p-2 my-2">
            <div>General</div>
            <q-input class="mb-2" v-model="model.name" label="Name" dense outlined debounce="1000" />
            <q-select use-input @filter="filterFn" @new-value="createValue" class="col-auto tags" dense outlined
                label="Tags" v-model="model.tags" multiple :options="availableTags" use-chips stack-label />
        </q-card>
        <q-card class="p-2 my-2" v-if="variableNames.length > 0">
            <div>Variables</div>
            <template v-for="variable in variableNames" :key="variable">
                <AutocompleteInput :includeFonts="true" :includeImages="true" v-model="model.variables[variable]"
                    :label="variable" />
            </template>
        </q-card>
        <q-card class="p-2 my-2">
            <CardComponentEditor label="Frontside templates" v-model="model.frontsideTemplates"
                :card-name="model.name" />
        </q-card>
        <q-card class="p-2 my-2">
            <CardComponentEditor label="Backside templates" v-model="model.backsideTemplates" :card-name="model.name" />
        </q-card>
    </q-scroll-area>
</template>

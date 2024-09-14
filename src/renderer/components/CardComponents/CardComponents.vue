<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import duplicateCard from '../../helpers/duplicate-card.js';
    import { Card } from '../../typings/card.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import CardComponentEditor from './CardComponentEditor/CardComponentEditor.vue';

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


</script>
<template>
    <q-scroll-area class="h-full">
        <q-card class="p-2 my-2">
            <div>General</div>
            <q-input v-model="model.name" label="Name" dense outlined />
        </q-card>
        <q-card class="p-2 my-2" v-if="variableNames.length > 0">
            <div>Variables</div>
            <template v-for="variable in variableNames" :key="variable">
                <AutocompleteInput :includeFonts="true" :includeImages="true" v-model="model.variables[variable]"
                    :label="variable" />
            </template>
        </q-card>
        <q-card class="p-2 my-2">
            <CardComponentEditor label="Frontside templates" v-model="model.frontsideTemplates" />
        </q-card>
        <q-card class="p-2 my-2">
            <CardComponentEditor label="Backside templates" v-model="model.backsideTemplates" />
        </q-card>
    </q-scroll-area>
</template>

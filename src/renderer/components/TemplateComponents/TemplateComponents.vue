<script lang="ts" setup>
import Template from '../../classes/template.js';
import { computed } from 'vue';

const model = defineModel<Template>({ default: new Template() })
const variableNames = computed(() => model.value.getVariables())

</script>
<template>
    <q-scroll-area class="h-full">
        <q-card class="p-2 my-2">
            <div>General</div>
            <q-input outlined v-model="model.name" label="Name" dense />
        </q-card>
        <q-card class="p-2 my-2" v-if="variableNames.length > 0">
            <div>Default variables values</div>
            <template v-for="variable in variableNames" :key="variable">
                <AutocompleteInput :includeFonts="true" :includeImages="true" v-model="model.previewVariables[variable]"
                    :label="variable" />
            </template>
        </q-card>
        <ComponentList v-model="model" />
    </q-scroll-area>
</template>

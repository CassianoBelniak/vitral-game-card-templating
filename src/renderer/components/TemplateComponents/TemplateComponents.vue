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
            <name-field class="mb-2" v-model="model.name" />
        </q-card>
        <q-card class="p-2 my-2">
            <div>Default variables values <q-icon name="help">
                    <q-tooltip>
                        Use variables to add dynamic content to templates. Type {your-var-name} in any field to create a
                        new variable.
                    </q-tooltip>
                </q-icon> </div>
            <template v-for="variable in variableNames" :key="variable">
                <AutocompleteInput class="mb-2" :includeFonts="true" :includeImages="true"
                    v-model="model.previewVariables[variable]" :label="variable" />
            </template>
        </q-card>
        <ComponentList v-model="model" />
    </q-scroll-area>
</template>

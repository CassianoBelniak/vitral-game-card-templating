<script lang="ts" setup>
    import { ref } from 'vue';
    import duplicatePipeline from '../../helpers/duplicate-pipeline.js';
    import { exportTypes, optionVisibility } from '../../helpers/export-settings.js';
    import { ExportPipeline } from '../../typings/export.js';
    import PipelineSizeFields from './PipelineSizeFields/PipelineSizeFields.vue';

    const showSelectCardModal = ref(false)
    const model = defineModel<ExportPipeline>({ default: duplicatePipeline(undefined) })
    const extensions = ['jpeg', 'pdf', 'pdfs', 'png', 'tiff']

</script>

<template>
    <div>
        <q-input v-model="model.name" label="Name" dense debounce="1000"></q-input>
        <q-input v-model="model.destination" label="Export path" dense debounce="1000"></q-input>
        <q-select v-model="model.extension" label="Extension" dense :options="extensions"></q-select>
        <q-btn class="my-2" no-caps label="Select cards" @click="showSelectCardModal = true" />
        <q-select v-model="model.exportType" label="Export type" dense :options="exportTypes" emit-value
            map-options></q-select>
        <PipelineSizeFields label="Paper size" v-model:x="model.paperWidth" v-model:y="model.paperHeight"
            :is-visible="!!optionVisibility[model.exportType]?.pageSize" />
        <PipelineSizeFields label="Margin" v-model:x="model.marginX" v-model:y="model.marginY"
            :is-visible="!!optionVisibility[model.exportType]?.margin" />
        <PipelineSizeFields label="Bleeding" v-model:x="model.bleedingX" v-model:y="model.bleedingY"
            :is-visible="!!optionVisibility[model.exportType]?.bleeding" />
        <PipelineSizeFields label="Backside offset" v-model:x="model.backsideOffsetX" v-model:y="model.backsideOffsetY"
            :is-visible="!!optionVisibility[model.exportType]?.backsideOffset" />
        <PipelineSizeFields label="Frontside offset" v-model:x="model.frontsideOffsetX"
            v-model:y="model.frontsideOffsetY" :is-visible="!!optionVisibility[model.exportType]?.frontsideOffset" />
        <PipelineSizeFields label="Card sides spacing" v-model:x="model.cardSidesSpacing"
            v-model:y="model.cardSidesSpacing" :is-visible="!!optionVisibility[model.exportType]?.cardSideSpacing"
            :hide-y="true" />
    </div>
    <card-selector v-model:cards="model.cards" v-model:show="showSelectCardModal" />
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import duplicatePipeline from '../../helpers/duplicate-pipeline.js';
    import { exportTypes, optionVisibility } from '../../helpers/export-settings.js';
    import { ExportPipeline } from '../../typings/export.js';
    import PipelineSizeFields from './PipelineSizeFields/PipelineSizeFields.vue';
    import { pickExportFolder } from '../../helpers/file-handling/pick-export-folder.js';

    const showSelectCardModal = ref(false)
    const model = defineModel<ExportPipeline>({ default: duplicatePipeline(undefined) })
    const extensions = ['jpeg', 'pdf', 'pdfs', 'png', 'tiff']

    async function selectExportFolder() {
        const folder = await pickExportFolder()
        if (folder) {
            model.value.destination = folder
        }
    }

</script>

<template>
    <q-scroll-area class="w-full h-full">
        <q-input v-model="model.name" label="Name" dense debounce="1000">
        </q-input>
        <q-input v-model="model.destination" label="Export path" dense debounce="1000">
            <template v-slot:append>
                <q-btn round dense flat icon="colorize" @click="selectExportFolder()"></q-btn>
            </template>
        </q-input>
        <q-checkbox label="Delete folder contents before export" v-model="model.eraseFolderContents"></q-checkbox>
        <q-select v-model="model.extension" label="Extension" dense :options="extensions"></q-select>
        <q-checkbox label="Crop card contents" v-model="model.cropCardContent"></q-checkbox><br>
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
        <card-selector v-model:cards="model.cards" v-model:show="showSelectCardModal" />
    </q-scroll-area>
</template>
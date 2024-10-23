<script lang="ts" setup>
    import { ref } from 'vue';
    import duplicatePipeline from '../../helpers/duplicate-pipeline.js';
    import { exportTypes, optionVisibility } from '../../helpers/export-settings.js';
    import { ExportPipeline } from '../../typings/export.js';
    import PipelineSizeFields from './PipelineSizeFields/PipelineSizeFields.vue';
    import { pickExportFolder } from '../../helpers/file-handling/pick-export-folder.js';

    const showSelectCardModal = ref(false)
    const model = defineModel<ExportPipeline>({ default: duplicatePipeline(undefined) })
    const extensions = [
        { value: 'jpeg', label: 'jpeg' },
        { value: 'pdf', label: 'PDF (Single file)' },
        { value: 'pdfs', label: 'PDF (Each page a file)' },
        { value: 'png', label: 'png' },
        { value: 'tiff', label: 'tiff' }
    ]

    async function selectExportFolder() {
        const folder = await pickExportFolder()
        if (folder) {
            model.value.destination = folder
        }
    }

    const commonPaperSizes = [
        { label: 'A0 - 841x1189mm', sizes: { width: '841mm', height: '1189mm' } },
        { label: 'A1 - 594x841mm', sizes: { width: '594mm', height: '841mm' } },
        { label: 'A2 - 420x594mm', sizes: { width: '420mm', height: '594mm' } },
        { label: 'A3 - 297x420mm', sizes: { width: '297mm', height: '420mm' } },
        { label: 'A4 - 210x297mm', sizes: { width: '210mm', height: '297mm' } },
        { label: 'A5 - 148x210mm', sizes: { width: '148mm', height: '210mm' } },
        { label: 'A6 - 105x148mm', sizes: { width: '105mm', height: '148mm' } },
        { label: 'Letter - 8.5x11in', sizes: { width: '8.5in', height: '11in' } },
        { label: 'Legal - 8.5x14in', sizes: { width: '8.5in', height: '14in' } },
        { label: 'Tabloid - 11x17in', sizes: { width: '11in', height: '17in' } },
    ]

    function onCommonPaperSizeSelected(size: { width: string, height: string }) {
        model.value.paperWidth = size.width
        model.value.paperHeight = size.height
    }

    function swapPaperSizes() {
        const temp = model.value.paperWidth
        model.value.paperWidth = model.value.paperHeight
        model.value.paperHeight = temp
    }

</script>

<template>
    <q-scroll-area class="w-full h-full">
        <name-field class="mb-2" v-model="model.name" />
        <q-input class="mb-2" v-model="model.destination" label="Export path" outlined dense debounce="100">
            <template v-slot:append>
                <q-btn round dense flat icon="colorize" @click="selectExportFolder()"></q-btn>
            </template>
        </q-input>
        <q-input class="mb-2" v-model="model.exportNameTemplate" label="Export name" dense outlined debounce="100">
            <q-tooltip>
                Use variables to personalize the export name:<br>
                Example: export_{page, 4}_{YY}_{MM}_{DD}.{ext}<br>
                {page, padding} - The page number<br>
                {ext} - The extension format<br>
                {side} - The card side (front, back), if appliable<br>
                {cardName} - The name of the card, if appliable<br>
                {$var} - Any variable from the card, if appliable<br>
                {SS} - Current second<br>
                {MM} - Current minute<br>
                {HH} - Current hour<br>
                {DD} - Current day<br>
                {MM} - Current month<br>
                {YY} - Current year<br>
                {random, size} - A random number<br>
            </q-tooltip>
        </q-input>
        <q-checkbox class="-ml-2 -mt-2" label="Delete folder contents before export"
            v-model="model.eraseFolderContents"></q-checkbox>
        <q-select v-model="model.extension" option-label="label" label="Extension" dense outlined :options="extensions"
            option-value="value" emit-value map-options></q-select>
        <q-checkbox class="-ml-2" label="Crop card contents" v-model="model.cropCardContent"></q-checkbox>
        <color-input class="full" v-model="model.backgroundColor" label="Background" />
        <q-btn class="my-2 full" no-caps push @click="showSelectCardModal = true">Select cards <div
                class="ml-2 text-gray-400">
            </div>
        </q-btn>
        <q-select class="mb-2" v-model="model.exportType" label="Export type" dense outlined :options="exportTypes"
            emit-value map-options></q-select>
        <PipelineSizeFields label="Paper size" v-model:x="model.paperWidth" v-model:y="model.paperHeight"
            :is-visible="!!optionVisibility[model.exportType]?.pageSize">
            <template v-slot:title>
                <q-btn round flat icon="colorize">
                    <q-popup-proxy class="me">
                        <div class="w-1">
                            &nbsp;
                            <q-menu :model-value="true" anchor="top right" self="top left">
                                <q-list style="min-width: 100px">
                                    <q-item clickable v-close-popup v-for="option in commonPaperSizes"
                                        @click="onCommonPaperSizeSelected(option.sizes)" v-bind:key="option.sizes">
                                        <q-item-section>{{ option.label }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </div>
                    </q-popup-proxy>
                </q-btn>
                <q-btn round flat icon="swap_horiz" @click="swapPaperSizes" />
            </template>
        </PipelineSizeFields>
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
<style lang="scss" scoped>
    .full {
        width: 100%;
    }
</style>
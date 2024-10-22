<script lang="ts" setup>
    import { ref } from 'vue';
    import ContentPad from '../components/ContentPad/ContentPad.vue';
    import SizeInput from '../components/SizeInput/SizeInput.vue';
    import { projectConfigStore } from '../stores/project-config-store';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import { useQuasar } from 'quasar';
    import convertToPixels from '../helpers/convert-to-pixels.js';
    const $q = useQuasar()
    const router = useRouter()

    const width = ref(projectConfigStore.width)
    const height = ref(projectConfigStore.height)
    const ppi = ref(projectConfigStore.ppi)
    const colors = ref([...projectConfigStore.colorPalette])

    const commonPagesSizes = [
        { label: 'Poker - 63x88mm', sizes: { width: '63mm', height: '88mm' } },
        { label: 'Bridge - 57x88mm', sizes: { width: '57mm', height: '88mm' } },
        { label: 'Mini - 44x68mm', sizes: { width: '44mm', height: '68mm' } },
        { label: 'Large tarot - 70x120mm', sizes: { width: '70mm', height: '120mm' } },
        { label: 'Small tarot - 70x108mm', sizes: { width: '70mm', height: '108mm' } },
        { label: 'Large square - 70x70mm', sizes: { width: '70mm', height: '70mm' } },
        { label: 'Small square - 63x63mm', sizes: { width: '63mm', height: '63mm' } }
    ]

    function save() {
        projectConfigStore.setConfigs({ width: width.value, height: height.value, ppi: ppi.value, colors: colors.value })
        router.push({ path: '/cards' })
    }

    function hasChanges() {
        if (width.value !== projectConfigStore.width) {
            return true
        }
        if (height.value !== projectConfigStore.height) {
            return true
        }
        if (ppi.value !== projectConfigStore.ppi) {
            return true
        }
        if (JSON.stringify(projectConfigStore.colorPalette) !== JSON.stringify(colors.value)) {
            return true
        }
        return false
    }

    onBeforeRouteLeave(() => {
        if (!hasChanges()) {
            return true
        }
        return new Promise(resolve => {
            $q.dialog({
                title: 'Unsaved changes',
                message: `Are you sure you want to leave? There are unsaved changes.`,
                cancel: true,
            }).onOk(() => {
                resolve(true)
            }).onCancel(() => resolve(false))
                .onDismiss(() => resolve(false))
        })
    })

    function onCommonCardSizeSelected(size: { width: string, height: string }) {
        width.value = size.width
        height.value = size.height
    }

    function swapSizes() {
        const temp = width.value
        width.value = height.value
        height.value = temp
    }

</script>
<template>
    <ContentPad>
        <div class="column h-full w-full justify-between">

            <div>
                <div>Card dimensions <q-btn round flat icon="colorize">
                        <q-popup-proxy class="me">
                            <div class="w-1">
                                &nbsp;
                                <q-menu :model-value="true" anchor="top right" self="top left">
                                    <q-list style="min-width: 100px">
                                        <q-item clickable v-close-popup v-for="option in commonPagesSizes"
                                            @click="onCommonCardSizeSelected(option.sizes)" v-bind:key="option.sizes">
                                            <q-item-section>{{ option.label }}</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </div>
                        </q-popup-proxy>
                    </q-btn>
                    <q-btn round flat icon="swap_horiz" @click="swapSizes" />
                </div>
                <div class="flex">
                    <SizeInput label="Width" v-model="width" />
                    <div class="text-h6 x-label">X</div>
                    <SizeInput label="Height" v-model="height" />
                </div>
                <div class="text-gray-500 mb-2">{{ convertToPixels(width, ppi).toFixed(0) }}X{{ convertToPixels(height,
                    ppi).toFixed(0) }}px</div>
                <div>Card quality</div>
                <q-input class="ppi" dense label="PPI" outlined type="number" v-model="ppi" debounce="100" />
                <div class="mt-2">Project color palette</div>
                <ColorPaletteEditor v-model="colors" />
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn label="Save" :disable="!hasChanges()" color="primary" @click="save" no-caps />
            </div>
        </div>

    </ContentPad>
</template>
<style>
    .x-label {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 5px;
    }

    .ppi {
        width: 80px;
    }
</style>
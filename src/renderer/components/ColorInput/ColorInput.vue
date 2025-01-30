<script setup lang="ts">
import debounce from 'debounce'
import { projectConfigStore } from '../../stores/project-config-store.js'

const model = defineModel<string>()
const props = defineProps<{
    label?: string
    allowVariables?: boolean
}>()

function onSetValue(value: string) {
    model.value = value
}

const updatevalue = debounce((value: string) => {
    onSetValue(value)
}, 1000)
</script>

<template>
    <q-input class="input" dense outlined :model-value="model" :label="props.label || 'Color'" @update:modelValue="onSetValue" debounce="100">
        <template v-slot:append>
            <q-btn round dense flat icon="colorize">
                <q-popup-proxy>
                    <q-color :model-value="model" @change="updatevalue" format-model="hexa" :palette="projectConfigStore.colorPalette" class="my-picker" />
                </q-popup-proxy>
            </q-btn>
        </template>
    </q-input>
</template>
<style lang="scss" scoped>
.input {
    width: 172px;
}
</style>

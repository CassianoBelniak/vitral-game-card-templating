<script lang="ts" setup>
import { computed } from 'vue';
import { fontsStore } from '../../stores/fonts-store.js';
import { imagesStore } from '../../stores/images-store.js';
import { templatesStore } from '../../stores/templates-store.js';
const model = defineModel<string>()
const props = defineProps<{ includeFonts?: boolean, includeImages?: boolean, includeTemplates?: boolean, label: string }>()

// TODO: improve custom value behavior
const options = computed(() => {
    const values = []
    if (props.includeFonts) {
        values.push(...Object.keys(fontsStore.fonts))
    }
    if (props.includeImages) {
        values.push(...Object.keys(imagesStore.images))
    }
    if (props.includeTemplates) {
        values.push(...Object.keys(templatesStore.templates))
    }
    return values
})

function onNewValue(value: string) {
    model.value = value
}

</script>
<template>
    <q-select v-model="model" :options="options" :label="props.label" dense use-input @new-value="onNewValue"
        clearable />
</template>
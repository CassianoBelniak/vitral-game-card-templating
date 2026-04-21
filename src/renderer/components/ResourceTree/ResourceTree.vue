<script lang="ts" setup>
import { computed, ref } from 'vue'
import { fontsStore } from '../../stores/fonts-store.js'
import { imagesStore } from '../../stores/images-store.js'
import { templatesStore } from '../../stores/templates-store.js'
import { projectConfigStore } from '../../stores/project-config-store.js'

const selected = ref<number>(0)
const emits = defineEmits<{
    selected: [node: string]
}>()
const filter = ref('')
const props = defineProps<{
    includeFonts?: boolean
    includeImages?: boolean
    includeTemplates?: boolean
    includeColors?: boolean
    includeIcons?: boolean
}>()

function getFont(path: string) {
    return fontsStore.fonts[path.replace('fonts/', '')]
}

function getImage(path: string) {
    return imagesStore.images[path]
}

const items = computed(() => {
    const foundItems: { name: string; image?: string; font?: string; color?: string }[] = []
    if (props.includeIcons) {
        foundItems.push(...Object.keys(imagesStore.images).map((image) => ({ name: `icons/${image}`, image })))
    }
    if (props.includeImages) {
        foundItems.push(...Object.keys(imagesStore.images).map((image) => ({ name: `image/${image}`, image })))
    }
    if (props.includeFonts) {
        foundItems.push(...Object.keys(fontsStore.fonts).map((font) => ({ name: font, font })))
    }
    if (props.includeTemplates) {
        foundItems.push(...Object.keys(templatesStore.templates).map((template) => ({ name: template, template })))
    }
    if (props.includeColors) {
        foundItems.push(...projectConfigStore.colorPalette.map((color) => ({ name: color, color })))
    }
    return foundItems.filter((item) => item.name.includes(filter.value))
})

function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
        if (selected.value < items.value.length) {
            selected.value += 1
        }
        e.preventDefault()
    }

    if (e.key === 'ArrowUp') {
        if (selected.value > 0) {
            selected.value -= 1
        }
        e.preventDefault()
    }

    if (e.key === 'Enter') {
        emits('selected', items.value[selected.value].name)
    }
}
</script>

<template>
    <div>
        <q-input v-model="filter" dense outlined autofocus @keydown="onKeyDown">
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
            <template v-slot:append>
                <q-icon name="close" @click="filter = ''" class="cursor-pointer" />
            </template>
        </q-input>
        <q-list>
            <q-item v-for="(item, index) in items" :style="{ backgroundColor: item.color }" :active="index === selected" active-class="bg-grey-1 text-grey-8">
                <q-item-section avatar>
                    <q-img v-if="item.image" :src="`data:${getImage(item.image).mimeType};base64,${getImage(item.image).data}`" />
                </q-item-section>

                <q-item-section v-if="item.font">
                    <div :style="`font-family: &quot;${getFont(item.font).fileName}&quot;;`">{{ item.name }}</div>
                </q-item-section>
                <q-item-section v-else>{{ item.name }}</q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import parseToNodes from '../../helpers/parse-to-nodes.js'
import { fontsStore } from '../../stores/fonts-store.js'
import { imagesStore } from '../../stores/images-store.js'
import { templatesStore } from '../../stores/templates-store.js'
import { projectConfigStore } from '../../stores/project-config-store.js'

const selected = ref<string>('')
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
const expandedKeys = ref(['images', 'fonts', 'templates', 'colors', 'icons'])

function getFont(path: string) {
    return fontsStore.fonts[path.replace('fonts/', '')]
}

function getImage(path: string) {
    return imagesStore.images[path.replace(/(^images\/)|(^icons\/)/m, '')]
}

const nodes = computed(() => {
    const values = []
    if (props.includeFonts) {
        values.push(...parseToNodes(Object.keys(fontsStore.fonts), 'fonts'))
    }
    if (props.includeImages) {
        values.push(...parseToNodes(Object.keys(imagesStore.images), 'images'))
    }
    if (props.includeIcons) {
        values.push(...parseToNodes(Object.keys(imagesStore.images), 'icons'))
    }
    if (props.includeTemplates) {
        values.push(...parseToNodes(Object.keys(templatesStore.templates), 'templates'))
    }
    if (props.includeColors) {
        values.push(...parseToNodes(projectConfigStore.colorPalette, 'colors'))
    }
    return values
})
</script>
<template>
    <div>
        <q-input v-model="filter" dense outlined>
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
            <template v-slot:append>
                <q-icon name="close" @click="filter = ''" class="cursor-pointer" />
            </template>
        </q-input>
        <q-tree
            class="tree"
            :nodes="nodes"
            v-model:expanded="expandedKeys"
            v-model:selected="selected"
            :filter="filter"
            node-label="label"
            node-key="value"
            accordion
            @update:selected="(value: string) => emits('selected', value)"
        >
            <template v-slot:default-header="prop">
                <div class="row items-center" :style="{ backgroundColor: prop.node.label }">
                    <!-- Meh, good enough -->
                    <template v-if="getImage(prop.node.value)">
                        <img class="h-5" :src="`data:${getImage(prop.node.value).mimeType};base64,${getImage(prop.node.value).data}`" />&nbsp;
                    </template>
                    {{ prop.node.label }}&nbsp;
                    <template v-if="prop.node.value.match(/^fonts/m) && getFont(prop.node.value)">
                        <div :style="`font-family: &quot;${getFont(prop.node.value).fileName}&quot;;`">{{ prop.node.label }}</div>
                    </template>
                </div>
            </template>
        </q-tree>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import parseToNodes from '../../helpers/parse-to-nodes.js';
    import { fontsStore } from '../../stores/fonts-store.js';
    import { imagesStore } from '../../stores/images-store.js';
    import { templatesStore } from '../../stores/templates-store.js';

    const selected = ref<string>('')
    const emits = defineEmits<{
        selected: [node: string]
    }>()
    const filter = ref('')
    const props = defineProps<{ includeFonts?: boolean, includeImages?: boolean, includeTemplates?: boolean }>()
    const expandedKeys = ref(['Images', 'Fonts', 'Templates'])

    const nodes = computed(() => {
        const values = []
        if (props.includeFonts) {
            values.push(parseToNodes(Object.keys(fontsStore.fonts), 'Fonts'))
        }
        if (props.includeImages) {
            values.push(parseToNodes(Object.keys(imagesStore.images), 'Images'))
        }
        if (props.includeTemplates) {
            values.push(parseToNodes(Object.keys(templatesStore.templates), 'Templates'))
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
        <q-tree class="tree" :nodes="nodes" v-model:expanded="expandedKeys" v-model:selected="selected" :filter="filter"
            node-label="label" node-key="value" accordion
            @update:selected="(value: string) => emits('selected', value)" />
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import { fontsStore } from '../../stores/fonts-store.js';
    import { imagesStore } from '../../stores/images-store.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import parseToNodes from '../../helpers/parse-to-nodes.js';
    const model = defineModel<string>()
    const filter = ref('')
    const props = defineProps<{ includeFonts?: boolean, includeImages?: boolean, includeTemplates?: boolean, label: string }>()
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
    <q-input class="input" dense outlined :label="props.label" v-model="model">
        <template v-slot:append>
            <q-btn round dense flat icon="colorize">
                <q-popup-proxy class="p-2">
                    <q-input v-model="filter" dense outlined>
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                        <template v-slot:append>
                            <q-icon name="close" @click="filter = ''" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-tree class="tree" :nodes="nodes" v-model:expanded="expandedKeys" :filter="filter"
                        node-label="label" node-key="value" v-model:selected="model" accordion />
                </q-popup-proxy>
            </q-btn>
        </template>
    </q-input>
</template>
<style lang="scss" scoped>
    .tree {
        width: 500px;
        height: 500px;
    }
</style>
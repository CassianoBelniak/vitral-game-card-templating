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
    <q-input debounce="1000" class="input" dense outlined :label="props.label" v-model="model">
        <template v-slot:append>
            <q-btn round dense flat icon="colorize">
                <q-popup-proxy class="p-2">
                    <resource-tree :include-fonts="props.includeFonts" :include-images="props.includeImages"
                        :include-templates="props.includeTemplates" @selected="(value: string) => { model = value }" />
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
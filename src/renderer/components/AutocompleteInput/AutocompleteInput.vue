<script lang="ts" setup>
const model = defineModel<string>()
const props = defineProps<{
    includeFonts?: boolean
    includeImages?: boolean
    includeTemplates?: boolean
    includeColors?: boolean
    includeIcons?: boolean
    label: string
}>()

function onUpdateValue(value: string) {
    if (value.match(/^icons\//m)) {
        model.value += `[${value.replace(/^icons\//m, '')}]`
    } else {
        model.value = value.replace(/(^fonts\/)|(^images\/)|(^templates\/)|(^colors\/)/m, '')
    }
}
</script>
<template>
    <q-input debounce="1000" class="input" dense outlined :label="props.label" v-model="model">
        <template v-slot:append>
            <q-btn round dense flat icon="colorize">
                <q-popup-proxy class="p-2">
                    <resource-tree
                        :include-fonts="props.includeFonts"
                        :include-images="props.includeImages"
                        :include-templates="props.includeTemplates"
                        :include-colors="props.includeColors"
                        :include-icons="props.includeColors"
                        @selected="onUpdateValue"
                    />
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

<script setup lang="ts">
    const model = defineModel<string>()
    const props = defineProps<{
        label?: string
    }>()

    function onSetValue(value: string) {
        if (value.charAt(0) === '$') {
            model.value = value.replace(/\$[^a-zA-Z0-9$]+/, '$')
        } else {
            model.value = value.replace(/[^a-zA-Z0-9#]/g, '')
        }
    }
</script>

<template>
    <q-input class="input" dense outlined :model-value="model" :label="props.label || 'Color'"
        @update:modelValue="onSetValue" debounce="1000">
        <template v-slot:append>
            <q-btn round dense flat icon="colorize">
                <q-popup-proxy>
                    <q-color v-model="model" format-model="hexa" class="my-picker" />
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
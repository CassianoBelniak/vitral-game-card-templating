<script lang="ts" setup>
    const model = defineModel<string>()

    function onSetValue(value: string) {
        if (value.charAt(0) === '$') {
            model.value = value.replace(/[^a-zA-Z0-9$]/g, '')
        } else {
            model.value = value.replace(/\D/g, '')
        }
    }
</script>
<template>
    <q-input class="input" dense outlined label="Rotation" :model-value="model" @update:modelValue="onSetValue"
        debounce="1000" />
</template>
<style lang="scss" scoped>
    .input {
        width: 172px;
    }
</style>
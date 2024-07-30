<script lang="ts" setup>
const props = defineProps(['label', 'value'])
defineEmits(['onChange'])
</script>

<template>
    <div class="container">
        <q-input dense outlined :label="props.label" :model-value="props.value"
            @update:modelValue="(value: String) => $emit('onChange', value)">
            <q-tooltip>
                A dimension field supports dimensions in "0px" and "0mm". If no measurement is informed, px is used.
            </q-tooltip>
        </q-input>
    </div>
</template>
<style scoped>
.container {
    width: 130px;
}
</style>
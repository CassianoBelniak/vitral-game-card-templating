<script lang="ts" setup>
    import { ref } from 'vue';
    import { removeInvalidChars } from '../../helpers/value-handlers.js';
    import attemptToEvaluate from '../../helpers/attempt-to-evaluate.js';

    const props = defineProps<{
        label: string
    }>()
    const model = defineModel<string>({ default: '' })
    const value = ref(model)

    function postValue() {
        const filteredValue = removeInvalidChars(value.value)
        const evaluatedValue = attemptToEvaluate(filteredValue)
        model.value = String(evaluatedValue)
        value.value = String(evaluatedValue)
    }

</script>
<template>
    <q-input dense outlined :label="props.label" v-model="value" debounce="100" @blur="postValue" />
</template>
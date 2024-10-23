<script lang="ts" setup>
    import isValidName from '../../helpers/validators/is-valid-name.js';

    const props = defineProps<{
        currentName: string
        existingNames: string[]
    }>()
    const model = defineModel<string>()
</script>
<template>
    <q-input v-model="model" label="Name" dense outlined debounce="100" :rules="[
        (val: string) => !!val || 'A name is required',
        (val: string) => isValidName(val) || 'The name cannot contain special characters',
    (val: string) => !!(!props.existingNames.includes(val) || val === props.currentName) || 'This name is already being used by another resource',
    ]" />

</template>
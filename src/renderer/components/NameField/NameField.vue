<script lang="ts" setup>
    import isValidName from '../../helpers/validators/is-valid-name.js';

    const model = defineModel<string>()
</script>
<template>
    <q-input v-model="model" label="Name" dense outlined debounce="1000" :rules="[
        (val: string) => !!val || 'A name is required',
        (val: string) => isValidName(val) || 'The name cannot contain special characters',
    ]" />

</template>
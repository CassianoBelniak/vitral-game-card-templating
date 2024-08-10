<script lang="ts" setup>
import Template from '../../classes/template.js';

const model = defineModel<Template>({ default: new Template() })

</script>
<template>
    <q-input v-model="model.name" label="Name" dense />
    <ComponentList v-model="model" />
</template>
<script lang="ts" setup>
import Template from '../../classes/template.js';

const model = defineModel<Template>({ default: new Template() })

</script>
<template>
    <q-card class="p-2 my-2">
        <div>General</div>
        <q-input v-model="model.name" label="Name" dense />
    </q-card>
    <ComponentList v-model="model" />
</template>
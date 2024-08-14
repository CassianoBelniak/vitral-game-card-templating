<script lang="ts" setup>
import Component from '../../../../classes/component.js';
import ComponentRectangle from '../../../../classes/ComponentRectangle.js';




const model = defineModel<Component>()

</script>
<template>
    <template v-if="model!.type === 'rectangle'">
        <TemplateComponentRectangle v-model="model as ComponentRectangle" />
    </template>
    <template v-if="model!.type === 'image'">
        <TemplateComponentImage v-model="model as ComponentImage" />
    </template>
    <template v-if="model!.type === 'text'">
        <TemplateComponentText v-model="model as ComponentText" />
    </template>
</template>
<script lang="ts" setup>
import Component from '../../classes/component.js';
import ComponentRectangle from '../../classes/ComponentRectangle.js';


const model = defineModel<Component>()

</script>
<template>
    <template v-if="model!.type === 'rectangle'">
        <TemplateComponentRectangle v-model="model as ComponentRectangle" />
    </template>
</template>
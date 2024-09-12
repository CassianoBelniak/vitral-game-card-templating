<script lang="ts" setup>
    import { ComponentRectangle } from '../../../../classes/ComponentRectangle.js';
    import { ComponentImage } from '../../../../classes/ComponentImage.js';
    import { ComponentText } from '../../../../classes/ComponentText.js';
    import { Component } from '../../../../classes/component.js';

    const emit = defineEmits<{
        moveUp: [],
        moveDown: [],
        delete: [],
        duplicate: []
    }>()

    const model = defineModel<Component>()

</script>
<template>
    <template v-if="model!.type === 'rectangle'">
        <TemplateComponentRectangle v-model="model as ComponentRectangle" @moveUp="emit('moveUp')"
            @moveDown="emit('moveDown')" @delete="emit('delete')" @duplicate="emit('duplicate')" />
    </template>
    <template v-if="model!.type === 'image'">
        <TemplateComponentImage v-model="model as ComponentImage" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')"
            @delete="emit('delete')" @duplicate="emit('duplicate')" />
    </template>
    <template v-if="model!.type === 'text'">
        <TemplateComponentText v-model="model as ComponentText" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')"
            @delete="emit('delete')" @duplicate="emit('duplicate')" />
    </template>
</template>
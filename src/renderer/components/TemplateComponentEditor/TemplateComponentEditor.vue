<script lang="ts" setup>
import Component from '../../classes/component.js';


defineProps<{
    component: Component
}>()

</script>
<template>
    <template v-if="component.type === 'rectangle'">
        <TemplateComponentRectangle :component="component" />
    </template>
</template>
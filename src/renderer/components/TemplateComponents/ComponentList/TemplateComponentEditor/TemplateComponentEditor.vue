<script lang="ts" setup>
import { ComponentRectangle } from '../../../../classes/component-rectangle.js'
import { ComponentImage } from '../../../../classes/component-image.js'
import { ComponentText } from '../../../../classes/component-text.js'
import { Component } from '../../../../classes/component.js'

const emit = defineEmits<{
    moveUp: []
    moveDown: []
    delete: []
    duplicate: []
}>()

const props = defineProps<{
    variables: { [key: string]: string }
}>()

const model = defineModel<Component>()
</script>
<template>
    <div>
        <template v-if="model!.type === 'rectangle'">
            <TemplateComponentRectangle
                v-model="model as ComponentRectangle"
                @moveUp="emit('moveUp')"
                @moveDown="emit('moveDown')"
                @delete="emit('delete')"
                @duplicate="emit('duplicate')"
                :variables="props.variables"
            />
        </template>
        <template v-if="model!.type === 'image'">
            <TemplateComponentImage
                v-model="model as ComponentImage"
                @moveUp="emit('moveUp')"
                @moveDown="emit('moveDown')"
                @delete="emit('delete')"
                @duplicate="emit('duplicate')"
                :variables="props.variables"
            />
        </template>
        <template v-if="model!.type === 'text'">
            <TemplateComponentText
                v-model="model as ComponentText"
                @moveUp="emit('moveUp')"
                @moveDown="emit('moveDown')"
                @delete="emit('delete')"
                @duplicate="emit('duplicate')"
                :variables="props.variables"
            />
        </template>
    </div>
</template>

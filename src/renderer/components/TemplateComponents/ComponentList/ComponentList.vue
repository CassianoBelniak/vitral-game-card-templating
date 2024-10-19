<script lang="ts" setup>
    import { Component } from '../../../classes/component.js';
    import { ComponentImage } from '../../../classes/component-image.js';
    import { ComponentRectangle } from '../../../classes/component-rectangle.js';
    import { ComponentText } from '../../../classes/component-text.js';
    import Template from '../../../classes/template.js';
    import { useQuasar } from 'quasar';

    const model = defineModel<Template>({ default: new Template() });
    const $q = useQuasar()

    function createRectangleComponent() {
        const component = new ComponentRectangle()
        model.value.components.push(component)
    }

    function createImageComponent() {
        const component = new ComponentImage()
        model.value.components.push(component)
    }

    function createTextComponent() {
        const component = new ComponentText()
        model.value.components.push(component)
    }

    function onMoveUp(index: number) {
        if (index === model.value.components.length - 1) return;
        const temp = model.value.components[index + 1]
        model.value.components[index + 1] = model.value.components[index]
        model.value.components[index] = temp
    }

    function onMoveDown(index: number) {
        if (index === 0) return;
        const temp = model.value.components[index - 1]
        model.value.components[index - 1] = model.value.components[index]
        model.value.components[index] = temp
    }

    function onDuplicate(index: number) {
        const copy = model.value.components[index].clone()
        copy.label += '_copy'
        model.value.components.splice(index, 0, copy)
    }

    function onDelete(index: number) {
        $q.dialog({
            title: 'Delete?',
            message: `Are you sure you want to delete this component?`,
            cancel: true,
        }).onOk(() => {
            model.value.components.splice(index, 1)
        })
    }

</script>
<template>
    <q-btn-dropdown icon="add" no-caps label="Add component" class="add-component-button">
        <q-list>
            <q-item clickable v-close-popup @click="createRectangleComponent">
                <q-item-section avatar>
                    <q-icon class="mr-2" size="2em" name="crop_square" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Rectangle</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="createImageComponent">
                <q-item-section avatar>
                    <q-icon class="mr-2" size="2em" name="image" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Image</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="createTextComponent">
                <q-item-section avatar>
                    <q-icon class="mr-2" size="2em" name="abc" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Text</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
    <div class="column reverse">
        <div class="mb-2" v-for="(component, index) in model.components" :key="component.id">
            <TemplateComponentEditor v-model="model.components[index]" @moveUp="onMoveUp(index)"
                @moveDown="onMoveDown(index)" @duplicate="onDuplicate(index)" @delete="onDelete(index)"
                :variables="model.previewVariables" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .add-component-button {
        width: 100%;
    }
</style>
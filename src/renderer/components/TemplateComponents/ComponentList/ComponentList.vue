<script lang="ts" setup>
import ComponentRectangle from '../../../classes/ComponentRectangle.js';
import Template from '../../../classes/template.js';

const model = defineModel<Template>({ default: new Template() });

function createRectangleComponent() {
    const component = new ComponentRectangle()
    model.value.components.push(component)
}


</script>
<template>
    <div v-for="(component, index) in model.components" :key="component.id">
        <TemplateComponentEditor v-model="model.components[index]" />
    </div>
    <q-btn-dropdown icon="add" label="Add component" class="add-component-button">
        <q-list>
            <q-item clickable v-close-popup @click="createRectangleComponent">
                <q-item-section>
                    <q-item-label>Rectangle</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>
<style lang="scss" scoped>
.add-component-button {
    width: 100%;
    margin-top: 10px;
}
</style>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { ComponentText } from '../../../../../../classes/component-text.js';

    const emit = defineEmits<{
        moveUp: [],
        moveDown: [],
        delete: [],
        duplicate: []
    }>()
    const props = defineProps<{
        variables: { [key: string]: string }
    }>()
    const isMainSectionOpen = ref(false)
    const model = defineModel<ComponentText>({ default: new ComponentText() })
    const verticalAlign = ['top', 'middle', 'bottom']
    const horizontalAlign = ['left', 'center', 'right']

</script>
<template>
    <q-card class="p-2">
        <div class="row justify-between items-center cursor-pointer" @click="isMainSectionOpen = !isMainSectionOpen">
            <div class="w-10">
                <Fit>
                    <RenderedComponent :component="model" :variables="props.variables" />
                </Fit>
            </div>
            <div class="ml-2">
                Text
            </div>
            <ExpandButton v-model="isMainSectionOpen" />
            <TemplateHandlers class="row col-grow justify-end" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')"
                @delete="emit('delete')" @duplicate="emit('duplicate')">
                <ToogleButton active-icon="select_all" inactive-icon="deselect" v-model="model.drawGuides" />
                <ToogleButton active-icon="visibility" inactive-icon="visibility_off" v-model="model.isVisible" />
            </TemplateHandlers>
        </div>
        <q-slide-transition>
            <div class="mt-2" v-show="isMainSectionOpen">
                <div class="row my-2 line">
                    <text-field v-model="model.text" />
                </div>
                <div class="mb-2 line">
                    <AutocompleteInput label="Font" v-model="model.font" :include-fonts="true" />
                </div>
                <div class="mb-2 line row">
                    <q-select class="half-input mr-7" v-model="model.alignment" label="Horizontal align"
                        :options="horizontalAlign" dense outlined />
                    <q-select class="half-input" v-model="model.verticalAlign" label="Vertical align"
                        :options="verticalAlign" dense outlined />
                </div>
                <div class="mb-2 line row">
                    <size-input class="mr-7" label="Font size" v-model="model.fontSize" />
                    <size-input label="Line height" v-model="model.lineHeight" />
                </div>
                Size
                <div class="row mb-2">
                    <size-input label="Width" v-model="model.width" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Height" v-model="model.height" :has-percent="true" />
                </div>
                Position
                <div class="row mb-2">
                    <size-input label="X" v-model="model.x" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Y" v-model="model.y" :has-percent="true" />
                </div>
                Rotation offset
                <div class="row mb-2">
                    <size-input label="X" v-model="model.offsetX" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Y" v-model="model.offsetY" :has-percent="true" />
                </div>
                <div class="row mb-2">
                    <RotationInput v-model="model.rotation" />
                </div>
                Margins
                <div class="row mb-2">
                    <size-input label="Top" v-model="model.topMargin" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Bottom" v-model="model.bottomMargin" :has-percent="true" />
                </div>
                Colors
                <div class="row mb-2">
                    <color-input v-model="model.color" />
                    <q-checkbox v-model="model.isFilled" label="Filled" />
                </div>
                <div class="row mb-2">
                    <color-input v-model="model.tooltipColor" label="Tooltip color" />
                </div>
            </div>
        </q-slide-transition>

    </q-card>
</template>
<style lang="scss" scoped>
    .half-input {
        width: 172px;
    }

    .container {
        padding: 10px;
    }

    .line {
        width: 374px;
    }
</style>
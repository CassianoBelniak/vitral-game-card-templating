<script lang="ts" setup>
import { ref } from 'vue'
import { ComponentRectangle } from '../../../../../../classes/component-rectangle.js'
const emit = defineEmits<{
    moveUp: []
    moveDown: []
    delete: []
    duplicate: []
}>()
const isMainSectionOpen = ref(false)
const props = defineProps<{
    variables: { [key: string]: string }
}>()

const model = defineModel<ComponentRectangle>({ default: new ComponentRectangle() })
</script>
<template>
    <q-card class="p-2">
        <div class="row justify-between items-center cursor-pointer" @click="isMainSectionOpen = !isMainSectionOpen">
            <div class="w-10">
                <Fit>
                    <RenderedComponent :component="model" :variables="props.variables" />
                </Fit>
            </div>
            <div class="ml-2 col truncate">
                {{ model.label }}
            </div>
            <ExpandButton v-model="isMainSectionOpen" />
            <TemplateHandlers
                class="row col-grow justify-end"
                @moveUp="emit('moveUp')"
                @moveDown="emit('moveDown')"
                @delete="emit('delete')"
                @duplicate="emit('duplicate')"
            >
                <ToogleButton active-icon="select_all" inactive-icon="deselect" v-model="model.drawGuides">
                    <q-tooltip> Toogle Component guides </q-tooltip>
                </ToogleButton>
                <ToogleButton active-icon="visibility" inactive-icon="visibility_off" v-model="model.isVisible">
                    <q-tooltip> Toogle visibility </q-tooltip>
                </ToogleButton>
            </TemplateHandlers>
        </div>
        <q-slide-transition>
            <div class="mt-2" v-show="isMainSectionOpen">
                <div class="row my-2 line">
                    <q-input class="w-full" v-model="model.label" label="Label" dense outlined debounce="100" />
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
                Offset
                <div class="row mb-2">
                    <size-input label="X" v-model="model.offsetX" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Y" v-model="model.offsetY" :has-percent="true" />
                </div>
                Rotation
                <div class="row mb-2">
                    <ValueInput class="half-input" v-model="model.rotation" label="Rotation" />
                </div>
                Color
                <div class="row mb-2">
                    <color-input v-model="model.color" />
                    <q-checkbox v-model="model.isFilled" label="Filled" />
                </div>
                Border
                <div class="row mb-2">
                    <size-input label="Width" v-model="model.borderWidth" :has-percent="true" />
                </div>
            </div>
        </q-slide-transition>
    </q-card>
</template>
<style lang="scss" scoped>
.container {
    padding: 10px;
}

.half-input {
    width: 172px;
}
</style>

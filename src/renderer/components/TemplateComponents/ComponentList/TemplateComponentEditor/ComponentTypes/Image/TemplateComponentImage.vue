<script lang="ts" setup>
    import { ref } from 'vue';
    import { ComponentImage } from '../../../../../../classes/component-image.js';
    import AutocompleteInput from '../../../../../AutocompleteInput/AutocompleteInput.vue';
    import RotationInput from '../../../../../RotationInput/RotationInput.vue';
    const emit = defineEmits<{
        moveUp: [],
        moveDown: [],
        delete: [],
        duplicate: []
    }>()
    const isMainSectionOpen = ref(false)
    const model = defineModel<ComponentImage>({ default: new ComponentImage() })
    const props = defineProps<{
        variables: { [key: string]: string }
    }>()
    const stretchModes = [
        { value: 'center', label: 'Center' },
        { value: 'tile', label: 'Tile' },
        { value: 'fit-x', label: 'Fit width' },
        { value: 'fit-y', label: 'Fit height' },
        { value: 'stretch', label: 'Stretch' },
        { value: 'cover', label: 'Cover' },
        { value: 'fit', label: 'Fit' }
    ]

</script>
<template>
    <q-card class="p-2 my-2">

        <div class="row justify-between items-center cursor-pointer" @click="isMainSectionOpen = !isMainSectionOpen">
            <div class="w-10">
                <Fit>
                    <RenderedComponent :component="model" :variables="props.variables" />
                </Fit>
            </div>
            <div class="ml-2">
                Image
            </div>
            <ExpandButton v-model="isMainSectionOpen" />
            <TemplateHandlers class="row col-grow justify-end" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')"
                @delete="emit('delete')" @duplicate="emit('duplicate')" />
        </div>
        <q-slide-transition>
            <div class="mt-2" v-show="isMainSectionOpen">
                <div class="mb-2 line">
                    <AutocompleteInput label="Name" v-model="model.name" :include-images="true" />
                </div>
                <div class="mb-2 line">
                    <q-select v-model="model.stretchMode" option-label="label" label="Stretch Mode" dense outlined
                        :options="stretchModes" option-value="value" emit-value map-options></q-select>
                </div>
                Size
                <div class="row mb-2">
                    <size-input label="Width" v-model="model.width" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Height" v-model="model.height" :has-percent="true" />
                </div>
                <template v-if="model.stretchMode === 'tile'">
                    Tilling offset
                    <div class="row mb-2">
                        <size-input label="Width" v-model="model.tillingOffsetX" :has-percent="true" />
                        <div class="text-h6 pt-1 mx-2">X</div>
                        <size-input label="Height" v-model="model.tillingOffsetY" :has-percent="true" />
                    </div>
                    Scalling
                    <div class="row mb-2">
                        <size-input label="Width" v-model="model.scaleX" :has-percent="true" />
                        <div class="text-h6 pt-1 mx-2">X</div>
                        <size-input label="Height" v-model="model.scaleY" :has-percent="true" />
                    </div>
                    Spacing
                    <div class="row mb-2">
                        <size-input label="Width" v-model="model.tillingSpacingX" :has-percent="true" />
                        <div class="text-h6 pt-1 mx-2">X</div>
                        <size-input label="Height" v-model="model.tillingSpacingY" :has-percent="true" />
                    </div>
                </template>
                Position
                <div class="row mb-2">
                    <size-input label="X" v-model="model.x" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Y" v-model="model.y" :has-percent="true" />
                </div>
                Rotation Offset
                <div class="row mb-2">
                    <size-input label="X" v-model="model.offsetX" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Y" v-model="model.offsetY" :has-percent="true" />
                </div>
                <div class="row mb-2">
                    <RotationInput v-model="model.rotation" />
                </div>
                <div class="row mb-2">
                    <q-checkbox v-model="model.flipX" label="Flip X" />
                    <q-checkbox v-model="model.flipY" label="Flip Y" />
                </div>
            </div>
        </q-slide-transition>
    </q-card>
</template>
<style lang="scss" scoped>
    .container {
        padding: 10px;
    }

    .line {
        width: 374px;
    }
</style>
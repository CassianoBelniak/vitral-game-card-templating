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

</script>
<template>
    <q-card class="p-2 my-2">

        <div class="row justify-between">
            <div class="my-2 mr-2">
                <q-icon class="mr-2" size="2em" name="image" />
                Image
            </div>
            <ExpandButton v-model="isMainSectionOpen" />
            <TemplateHandlers class="row col-grow justify-end" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')"
                @delete="emit('delete')" @duplicate="emit('duplicate')" />
        </div>
        <q-slide-transition>
            <div class="mt-2" v-show="isMainSectionOpen">
                <div class="mt-2 line">
                    <AutocompleteInput label="Name" v-model="model.name" :include-images="true" />
                </div>
                <div class="row my-2">
                    <size-input label="Width" v-model="model.width" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Height" v-model="model.height" :has-percent="true" />
                </div>
                <div class="row mb-2">
                    <size-input label="X" v-model="model.x" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Y" v-model="model.y" :has-percent="true" />
                </div>
                <div class="row mb-2">
                    <size-input label="Offset X" v-model="model.offsetX" :has-percent="true" />
                    <div class="text-h6 pt-1 mx-2">X</div>
                    <size-input label="Offset Y" v-model="model.offsetY" :has-percent="true" />
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
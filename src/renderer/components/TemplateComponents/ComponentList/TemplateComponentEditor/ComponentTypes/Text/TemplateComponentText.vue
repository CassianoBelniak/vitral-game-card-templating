<script lang="ts" setup>
    import { ref } from 'vue';
    import { ComponentText } from '../../../../../../classes/ComponentText.js';

    const emit = defineEmits<{
        moveUp: [],
        moveDown: [],
        delete: [],
        duplicate: []
    }>()
    const isMainSectionOpen = ref(false)
    const model = defineModel<ComponentText>({ default: new ComponentText() })

</script>
<template>
    <q-card class="p-2 my-2">
        <div class="row justify-between">
            <div class="my-2 mr-2">
                <q-icon class="mr-2" size="2em" name="abc" />
                Text
            </div>
            <ExpandButton v-model="isMainSectionOpen" />
            <TemplateHandlers class="row col-grow justify-end" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')"
                @delete="emit('delete')" @duplicate="emit('duplicate')" />
        </div>
        <q-slide-transition>
            <div class="mt-2" v-show="isMainSectionOpen">
                <div class="row my-2 line">
                    <q-input class="w-full" v-model="model.text" label="Text" dense outlined type="textarea" autogrow
                        debounce="1000" />
                </div>
                <div class="mt-2 line">
                    <AutocompleteInput label="Font" v-model="model.font" :include-fonts="true" />
                </div>
                <div class="mt-2 line">
                    <size-input label="Font size" v-model="model.fontSize" />
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
    .container {
        padding: 10px;
    }

    .line {
        width: 374px;
    }
</style>
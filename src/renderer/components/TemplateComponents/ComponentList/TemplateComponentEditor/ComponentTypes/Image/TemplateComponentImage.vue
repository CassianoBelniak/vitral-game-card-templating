<script lang="ts" setup>
import ComponentImage from '../../../../../../classes/ComponentImage.js';
import AutocompleteInput from '../../../../../AutocompleteInput/AutocompleteInput.vue';

const model = defineModel<ComponentImage>({ default: new ComponentImage() })

</script>
<template>
    <q-card class="p-2 my-2">
        <div class="mb-1">Image</div>
        <AutocompleteInput label="Name" v-model="model.name" :include-images="true" />
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
        <q-input v-model="model.rotation" label="Rotation" />
    </q-card>
</template>
<style lang="scss" scoped>
.container {
    padding: 10px;
}
</style>
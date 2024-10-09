<script lang="ts" setup>
    const model = defineModel<string[]>({ default: [] })

    function removeColor(index: number) {
        model.value.splice(index, 1)
    }

    function duplicateColor(index: number) {
        model.value.splice(index, 0, model.value[index])
    }

</script>
<template>
    <div class="row">
        <q-btn class="w-5 h-5" :style="`background-color: ${color};`" v-for="(color, index) in model">
            <q-popup-proxy>
                <q-btn icon="delete" @click="removeColor(index)" />
                <q-btn icon="content_copy" @click="duplicateColor(index)" />
                <q-color v-model="model[index]" format-model="hexa" />
            </q-popup-proxy>
        </q-btn>
        <q-btn icon="add" @click="model.push(model.at(-1) ?? '#ffffff')" />
    </div>
</template>
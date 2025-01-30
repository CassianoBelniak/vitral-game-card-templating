<script lang="ts" setup>
const model = defineModel<string[]>({ default: [] })

function removeColor(index: number) {
    model.value.splice(index, 1)
}

function duplicateColor(index: number) {
    model.value.splice(index, 0, model.value[index])
}

function getMode(color: string) {
    if (hasAlpha(color)) {
        return 'hexa'
    }
    return 'hex'
}

function hasAlpha(color: string) {
    return color.length === 9
}

function toogleAlpha(index: number) {
    if (hasAlpha(model.value[index])) {
        model.value[index] = model.value[index].slice(0, -2)
    } else {
        model.value[index] += 'ff'
    }
}

function getAlphaButtonColor(index: number) {
    if (hasAlpha(model.value[index])) {
        return 'grey-14'
    }
    return ''
}
</script>
<template>
    <div class="row">
        <q-btn class="w-5 h-5" :style="`background-color: ${color};`" v-for="(color, index) in model" v-bind:key="index">
            <q-popup-proxy>
                <div class="col">
                    <div class="row">
                        <q-btn class="col-4" flat icon="delete" @click="removeColor(index)" />
                        <q-btn class="col-4" flat icon="content_copy" @click="duplicateColor(index)" />
                        <q-btn class="col-4" unelevated icon="gradient" :color="getAlphaButtonColor(index)" @click="toogleAlpha(index)" />
                    </div>
                    <q-color v-model="model[index]" :format-model="getMode(model[index])" />
                </div>
            </q-popup-proxy>
        </q-btn>
        <q-btn icon="add" @click="model.push(model.at(-1) ?? '#ffffff')" />
    </div>
</template>


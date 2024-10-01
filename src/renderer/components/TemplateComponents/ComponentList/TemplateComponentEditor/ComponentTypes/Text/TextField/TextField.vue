<script lang="ts" setup>
    const model = defineModel<string>()

    function onSelected(value: string) {
        model.value += `[${value}]`
    }

</script>
<template>
    <q-input class="w-full" v-model="model" label="Text" dense outlined type="textarea" autogrow debounce="1000">
        <q-btn round dense flat icon="colorize" color="grey">
            <q-popup-proxy class="p-2">
                <resource-tree :include-images="true" @selected="onSelected" />
            </q-popup-proxy>
        </q-btn>
    </q-input>
</template>
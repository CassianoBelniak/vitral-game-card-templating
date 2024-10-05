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
        <q-tooltip>
            This component supports some special formatting options:<br>
            Any text inside less and more than characters will be rendered using the tooltip color, like &lttext
            rendered red&gt<br>
            You can specify images inside brackets to render icons, like [icon.png]
        </q-tooltip>
    </q-input>
</template>
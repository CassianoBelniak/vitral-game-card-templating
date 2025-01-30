<script lang="ts" setup>
const model = defineModel<boolean>()
</script>
<template>
    <q-btn color="grey" round flat dense :icon="model ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click.stop="model = !model" />
</template>

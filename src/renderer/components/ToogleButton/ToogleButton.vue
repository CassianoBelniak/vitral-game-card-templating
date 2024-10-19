<script lang="ts" setup>
    const model = defineModel<boolean>()
    const props = defineProps<{
        activeIcon: string
        inactiveIcon: string
    }>()
</script>
<template>
    <q-btn v-if="model" :icon="props.activeIcon" round flat dense @click.stop="model = !model">
        <slot></slot>
    </q-btn>
    <q-btn v-if="!model" :icon="props.inactiveIcon" round flat dense @click.stop="model = !model">
        <slot></slot>
    </q-btn>
</template>
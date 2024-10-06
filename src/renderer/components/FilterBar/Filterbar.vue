<script lang="ts" setup>

    const cardSize = defineModel<number>('cardSize')
    const searchText = defineModel<string>('searchText')
    const props = defineProps<{
        hideSearch?: boolean
    }>()
    const emits = defineEmits<{
        filterChanged: []
    }>()

</script>
<template>
    <q-card class="row items-center">
        <q-slider class="slider mr-2" v-model="cardSize" :min="50" :max="1500" />
        <q-separator vertical />
        <q-input dense standout v-model="searchText" v-if="!props.hideSearch" outlined class="mx-2" debounce="1000"
            @change="emits('filterChanged')">
            <template v-slot:append>
                <q-icon v-if="searchText === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
            </template>
        </q-input>
        <slot></slot>
    </q-card>
</template>
<style scoped>
    .slider {
        width: 200px;
    }
</style>
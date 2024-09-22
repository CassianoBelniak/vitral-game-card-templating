<script lang="ts" setup>
    import { onUnmounted } from 'vue';
    import { projectConfigStore, saveConfig } from '../stores/project-config-store.js';
    onUnmounted(() => {
        saveConfig()
    })
</script>
<template>
    <ContentPad>
        <div class="row justify-between items-center">
            <div class="text-h6">Templates</div>
            <q-btn push icon="add" align="left" to="/templates/edit" no-caps>New template</q-btn>
        </div>
        <q-card class="my-3 p-2 row items-center">
            <q-slider class="slider mr-2" v-model="projectConfigStore.filters.templates.cardSize" :min="50"
                :max="500" />
            <q-separator vertical />
            <div class="m-2">Filters:</div>
            <q-input dense standout v-model="projectConfigStore.filters.templates.searchText" outlined class="mr-2"
                debounce="1000">
                <template v-slot:append>
                    <q-icon v-if="projectConfigStore.filters.templates.searchText === ''" name="search" />
                    <q-icon v-else name="clear" class="cursor-pointer"
                        @click="projectConfigStore.filters.templates.searchText = ''" />
                </template>
            </q-input>
        </q-card>
        <TemplateList :card-size="projectConfigStore.filters.templates.cardSize"
            :search-text="projectConfigStore.filters.templates.searchText" />

    </ContentPad>
</template>
<style lang="scss" scoped>
    .slider {
        width: 200px;
    }

    .tags {
        width: 300px;
    }
</style>
<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue'
import { projectConfigStore, saveConfig } from '../stores/project-config-store.js'
import getAllTags from '../helpers/get-all-tags.js'
import getAllCardVariables from '../helpers/get-all-card-variables.js'
import { cardStore } from '../stores/cards-store.js'

const tagOptions = getAllTags()

const columns = computed(() => [
    { name: '_internal_name', label: 'Name' },
    { name: '_internal_tags', label: 'Tags' },
    { name: '_internal_source', label: 'Source' },
    { name: '_internal_front', label: 'Front side' },
    { name: '_internal_back', label: 'Back side' },
    ...getAllCardVariables(Object.values(cardStore.cards))
        .filter((variable) => variable !== 'name')
        .map((variable) => ({ name: variable, label: variable })),
])

const visibleColumns = ref<Record<string, boolean>>({
    _internal_name: true,
    _internal_tags: true,
})

onUnmounted(() => {
    saveConfig()
})

function openCardsFolder() {
    window.electronAPI.showFile(`${projectConfigStore.workingDirectory}/assets/cards`)
}
</script>

<template>
    <ContentPad>
        <div class="column w-full h-full gap-3">
            <div class="row justify-between items-center gap-2">
                <q-input class="col" dense standout v-model="projectConfigStore.filters.cards.searchText" outlined debounce="100" placeholder="Search...">
                    <template v-slot:append>
                        <q-icon v-if="projectConfigStore.filters.cards.searchText === ''" name="search" />
                        <q-icon v-else name="clear" class="cursor-pointer" @click="projectConfigStore.filters.cards.searchText = ''" />
                    </template>
                </q-input>
                <q-select
                    class="tags"
                    dense
                    outlined
                    label="Tags"
                    v-model="projectConfigStore.filters.cards.tags"
                    multiple
                    :options="tagOptions"
                    use-chips
                    stack-label
                />
                <q-btn class="h-full new-card-button" push icon="add" align="left" to="/cards/edit" color="primary" no-caps>New card</q-btn>

                <q-btn flat round icon="more_vert">
                    <q-menu anchor="bottom left" self="top right">
                        <q-list>
                            <q-item clickable v-close-popup @click="openCardsFolder()">
                                <q-item-section>Show cards folder</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </div>
            <div class="row w-full items-center gap-x-1">
                <div>Columns:</div>
                <q-chip v-for="column in columns" :key="column.name">
                    <q-checkbox
                        :label="column.label"
                        :model-value="visibleColumns[column.name] || false"
                        @update:model-value="visibleColumns[column.name] = !visibleColumns[column.name]"
                    />
                </q-chip>
            </div>
            <q-scroll-area class="col">
                <CardList
                    :columns="columns"
                    :visible-columns="visibleColumns"
                    :filter-tags="projectConfigStore.filters.cards.tags"
                    :search-text="projectConfigStore.filters.cards.searchText"
                >
                </CardList>
            </q-scroll-area>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
.slider {
    width: 200px;
}

.tags {
    width: 300px;
}

.new-card-button {
    height: 100%;
}
</style>

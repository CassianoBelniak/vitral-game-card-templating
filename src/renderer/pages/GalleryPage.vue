<script lang="ts" setup>
import { onUnmounted } from 'vue'
import { projectConfigStore, saveConfig } from '../stores/project-config-store.js'
import getAllTags from '../helpers/get-all-tags.js'

const tagOptions = getAllTags()

onUnmounted(() => {
    saveConfig()
})

function openCardsFolder() {
    window.electronAPI.showFile(`${projectConfigStore.workingDirectory}/assets/cards`)
}
</script>

<template>
    <ContentPad>
        <div class="column w-full h-full">
            <div class="row justify-between items-center">
                <h6 class="text-h6">Cards</h6>
                <q-btn push icon="add" align="left" to="/cards/edit" no-caps>New card</q-btn>
            </div>
            <q-card class="my-3 p-2 row items-center">
                <div class="m-2">Filters:</div>
                <q-input dense standout v-model="projectConfigStore.filters.cards.searchText" outlined class="mr-2" debounce="100">
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
                <div class="row col justify-end">
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
            </q-card>
            <q-scroll-area class="col">
                <CardList :filter-tags="projectConfigStore.filters.cards.tags" :search-text="projectConfigStore.filters.cards.searchText"> </CardList>
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
</style>

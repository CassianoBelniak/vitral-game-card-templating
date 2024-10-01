<script lang="ts" setup>
    import { onUnmounted } from 'vue';
    import { cardStore } from '../stores/cards-store.js';
    import { projectConfigStore, saveConfig } from '../stores/project-config-store.js';
    const tagOptions = cardStore.getAllCardTags()

    onUnmounted(() => {
        saveConfig()
    })

</script>

<template>
    <ContentPad>
        <div class="column w-full h-full">

            <div class="row justify-between items-center">
                <h6 class="text-h6">Cards</h6>
                <q-btn push icon="add" align="left" to="/cards/edit" no-caps>New card</q-btn>
            </div>
            <q-card class="my-3 p-2 row items-center">
                <q-slider class="slider mr-2" v-model="projectConfigStore.filters.cards.cardSize" :min="50"
                    :max="500" />
                <q-separator vertical />
                <q-checkbox class="ml-2" left-label v-model="projectConfigStore.filters.cards.showFront"
                    label="Frontside" />
                <q-checkbox class="ml-2" left-label v-model="projectConfigStore.filters.cards.showBack"
                    label="Backside" />
                <q-separator vertical />
                <div class="m-2">Filters:</div>
                <q-input dense standout v-model="projectConfigStore.filters.cards.searchText" outlined class="mr-2"
                    debounce="1000">
                    <template v-slot:append>
                        <q-icon v-if="projectConfigStore.filters.cards.searchText === ''" name="search" />
                        <q-icon v-else name="clear" class="cursor-pointer"
                            @click="projectConfigStore.filters.cards.searchText = ''" />
                    </template>
                </q-input>
                <q-select class="tags" dense outlined label="Tags" v-model="projectConfigStore.filters.cards.tags"
                    multiple :options="tagOptions" use-chips stack-label />
            </q-card>
            <q-scroll-area class="col">
                <CardList :card-size="projectConfigStore.filters.cards.cardSize"
                    :filter-tags="projectConfigStore.filters.cards.tags"
                    :search-text="projectConfigStore.filters.cards.searchText"
                    :show-back="projectConfigStore.filters.cards.showBack"
                    :show-front="projectConfigStore.filters.cards.showFront"></CardList>
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
<script lang="ts" setup>
    import { ref } from 'vue';
    import { cardStore } from '../stores/cards-store.js';

    const cardSize = ref(200)
    const tags = ref([])
    const searchText = ref('')
    const showFront = ref(true)
    const showBack = ref(true)
    const tagOptions = cardStore.getAllCardTags()

</script>

<template>
    <ContentPad>
        <div class="row justify-between items-center">
            <h6 class="text-h6">Cards</h6>
            <q-btn push icon="add" align="left" to="/cards/edit" no-caps>New card</q-btn>
        </div>
        <q-card class="my-3 p-2 row items-center">
            <q-slider class="slider mr-2" v-model="cardSize" :min="50" :max="500" />
            <q-separator vertical />
            <q-checkbox class="ml-2" left-label v-model="showFront" label="Frontside" />
            <q-checkbox class="ml-2" left-label v-model="showBack" label="Backside" />
            <q-separator vertical />
            <div class="m-2">Filters:</div>
            <q-input dense standout v-model="searchText" outlined class="mr-2" debounce="1000">
                <template v-slot:append>
                    <q-icon v-if="searchText === ''" name="search" />
                    <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
                </template>
            </q-input>
            <q-select class="tags" dense outlined label="Tags" v-model="tags" multiple :options="tagOptions" use-chips
                stack-label />
        </q-card>
        <CardList :card-size="cardSize" :filter-tags="tags" :search-text="searchText" :show-back="showBack"
            :show-front="showFront"></CardList>
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
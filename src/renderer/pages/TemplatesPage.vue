<script lang="ts" setup>
    import { ref } from 'vue';

    const cardSize = ref(100)
    const searchText = ref('')


</script>
<template>
    <ContentPad>
        <div class="row justify-between items-center">
            <div class="text-h6">Templates</div>
            <q-btn push icon="add" align="left" to="/templates/edit" no-caps>New template</q-btn>
        </div>
        <q-card class="my-3 p-2 row items-center">
            <q-slider class="slider mr-2" v-model="cardSize" :min="50" :max="500" />
            <q-separator vertical />
            <div class="m-2">Filters:</div>
            <q-input dense standout v-model="searchText" outlined class="mr-2" debounce="1000">
                <template v-slot:append>
                    <q-icon v-if="searchText === ''" name="search" />
                    <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
                </template>
            </q-input>
        </q-card>
        <TemplateList :card-size="cardSize" :search-text="searchText" />

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
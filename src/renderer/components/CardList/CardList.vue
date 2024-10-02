<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import { cardStore } from '../../stores/cards-store.js';
    import { computed } from 'vue';
    import { Card } from '../../typings/card.js';
    import duplicateCard from '../../helpers/duplicate-card.js';

    const router = useRouter();

    const props = defineProps<{
        cardSize: number
        showFront: boolean
        showBack: boolean
        filterTags: string[]
        searchText: string
    }>()

    const cardSize = computed(() => `${props.cardSize}px`)

    const goToCardEdit = (cardName: string) => {
        router.push({ name: 'EditCard', query: { cardName } })
    };

    function isCardVisible(card: Card) {
        if (!card.name.toLocaleLowerCase().includes(props.searchText)) {
            return false
        }

        for (const tag of props.filterTags) {
            if (!card.tags.includes(tag)) {
                return false
            }
        }

        return true
    }

    function onDuplicateCard(cardName: string) {
        const copy = duplicateCard(cardStore.cards[cardName])
        copy.name += '_copy'
        cardStore.setCard(copy.name, copy)
    }

</script>
<template>
    <div class="row wrap justify-start">
        <div class="card-container col-auto" v-for="(card, index) in cardStore.cards" :key="index">
            <div class="template-card" v-if="isCardVisible(card)">
                <div @click="goToCardEdit(card.name)" class="row">
                    <div class="image mr-1" v-if="showFront">
                        <Fit>
                            <RenderedCard :card="card" :templatesNames="card.frontsideTemplates" />
                        </Fit>
                    </div>
                    <div class="image" v-if="showBack">
                        <Fit>
                            <RenderedCard :card="card" :templatesNames="card.backsideTemplates" />
                        </Fit>
                    </div>
                </div>
                <div class="mt-2 row justify-between">
                    <div @click="goToCardEdit(card.name)" class="col-auto mt-2">
                        {{ card.name }}
                    </div>
                    <div class="col-auto">
                        <q-btn icon="delete" flat round @click="cardStore.removeCard(card.name)" />
                        <q-btn icon="content_copy" flat round @click="onDuplicateCard(card.name)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .card-container {
        margin-bottom: 30px;
    }

    .image {
        width: v-bind('cardSize');
    }

    .template-card {
        margin-right: 20px;
        cursor: pointer;
    }
</style>
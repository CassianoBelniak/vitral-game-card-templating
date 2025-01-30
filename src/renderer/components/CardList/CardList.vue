<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { cardStore } from '../../stores/cards-store.js'
import { computed } from 'vue'
import { Card } from '../../typings/card.js'
import duplicateCard from '../../helpers/duplicate-card.js'
import { useQuasar } from 'quasar'
import removeCard from '../../helpers/stores/io-utils/remove-card.js'
import generateId from '../../helpers/generate-id.js'
import sortCardsByIndex from '../../helpers/sort-cards-by-index.js'

const router = useRouter()
const $q = useQuasar()

const props = defineProps<{
    cardSize: number
    showFront: boolean
    showBack: boolean
    filterTags: string[]
    searchText: string
}>()

const cardSize = computed(() => `${props.cardSize}px`)

const goToCardEdit = (cardId: string) => {
    router.push({ name: 'EditCard', query: { cardId } })
}

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

function onRemoveCard(cardId: string) {
    $q.dialog({
        title: 'Delete?',
        message: `Are you sure you want to delete this card?`,
        cancel: true,
    }).onOk(() => {
        delete cardStore.cards[cardId]
        removeCard(cardId)
    })
}

function onDuplicateCard(cardId: string) {
    const copy = duplicateCard(cardStore.cards[cardId])
    copy.id = generateId()
    cardStore.cards[copy.id] = copy
}

function getSortedCards() {
    const cards = Object.values(cardStore.cards)
    return sortCardsByIndex(cards)
}
</script>
<template>
    <div class="row wrap justify-start">
        <div class="card-container col-auto" v-for="card in getSortedCards()" :key="card.id">
            <div class="template-card" v-if="isCardVisible(card)">
                <div @click="goToCardEdit(card.id)" class="row">
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
                    <div @click="goToCardEdit(card.id)" class="col-auto mt-2 whitespace-pre">
                        {{ card.name }}
                    </div>
                    <div class="col-auto">
                        <q-btn icon="delete" flat round @click="onRemoveCard(card.id)" />
                        <q-btn icon="content_copy" flat round @click="onDuplicateCard(card.id)" />
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

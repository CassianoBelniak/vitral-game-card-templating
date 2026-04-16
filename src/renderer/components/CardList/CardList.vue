<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { cardStore } from '../../stores/cards-store.js'
import { computed, ref } from 'vue'
import { Card } from '../../typings/card.js'
import duplicateCard from '../../helpers/duplicate-card.js'
import { useQuasar } from 'quasar'
import removeCard from '../../helpers/stores/io-utils/remove-card.js'
import generateId from '../../helpers/generate-id.js'
import sortCardsByIndex from '../../helpers/sort-cards-by-index.js'

const router = useRouter()
const $q = useQuasar()

const props = defineProps<{
    filterTags: string[]
    searchText: string
}>()

const columns = [
    {
        field: 'name',
        name: 'name',
        align: 'left',
        label: 'Name',
    },
    { name: 'tags', label: 'Tags', align: 'left', field: 'tags' },
    { name: 'source', label: 'Source', align: 'left', field: 'source' },
    { name: 'front', label: 'Front side', align: 'center' },
    { name: 'back', label: 'Back side', align: 'center' },
    { name: 'actions', label: '' },
]

const pagination = ref(0)

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
    const filteredCards = cards.filter(isCardVisible)
    return sortCardsByIndex(filteredCards)
}
</script>
<template>
    <div class="row wrap justify-start">
        <q-table
            class="w-full"
            :rows="getSortedCards()"
            :columns="columns"
            flat
            hide-bottom
            row-key="id"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
        >
            <template v-slot:body="props">
                <q-tr :props="props" @click="goToCardEdit(props.row.id)">
                    <q-td key="name" :props="props">
                        {{ props.row.name }}
                    </q-td>
                    <q-td key="tags" :props="props">
                        {{ props.row.tags.join(', ') }}
                    </q-td>
                    <q-td key="source" :props="props">
                        {{ props.row.source }}
                    </q-td>
                    <q-td key="front" :props="props">
                        <Fit>
                            <RenderedCard :card="props.row" side="front" />
                        </Fit>
                    </q-td>
                    <q-td key="back" :props="props">
                        <Fit>
                            <RenderedCard :card="props.row" side="back" />
                        </Fit>
                    </q-td>
                    <q-td key="actions" :props="props">
                        <div class="row">
                            <q-btn icon="delete" flat round @click="onRemoveCard(props.row.id)" />
                            <q-btn icon="content_copy" flat round @click="onDuplicateCard(props.row.id)" />
                        </div>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}

.template-card {
    margin-right: 20px;
    cursor: pointer;
}
</style>

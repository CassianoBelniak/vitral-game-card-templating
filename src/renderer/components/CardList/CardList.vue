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
import getAllTags from '../../helpers/get-all-tags.js'
import getAllCardFiles from '../../helpers/get-all-card-files.js'
import removeInvalidCharsFromFilename from '../../helpers/remove-invalid-chars-from-filename.js'

const router = useRouter()
const $q = useQuasar()

const props = defineProps<{
    filterTags: string[]
    searchText: string
    columns: { name: string; label: string }[]
    visibleColumns: Record<string, boolean>
}>()

const availableTags = ref<string[]>(getAllTags())
const availableFiles = ref<string[]>(getAllCardFiles())

const columns = computed(() => {
    const computedColumns = []
    if (props.visibleColumns._internal_name) {
        computedColumns.push({
            field: 'name',
            name: 'name',
            align: 'left',
            label: 'Name',
        })
    }
    if (props.visibleColumns._internal_tags) {
        computedColumns.push({ name: 'tags', label: 'Tags', align: 'left', field: 'tags' })
    }

    if (props.visibleColumns._internal_source) {
        computedColumns.push({ name: 'source', label: 'Source', align: 'left', field: 'source' })
    }

    for (const variableColumn of props.columns) {
        if (!variableColumn.name.includes('_internal') && props.visibleColumns[variableColumn.name]) {
            computedColumns.push({
                field: (entry: Card) => entry.variables[variableColumn.name],
                name: variableColumn.name,
                label: variableColumn.label,
                align: 'left',
            })
        }
    }

    computedColumns.push({ name: 'actions', label: '', align: 'right' })

    if (props.visibleColumns._internal_front) {
        computedColumns.push({ name: 'front', label: 'Front side', align: 'center' })
    }

    if (props.visibleColumns._internal_back) {
        computedColumns.push({ name: 'back', label: 'Back side', align: 'center' })
    }

    return computedColumns
})

const variableColumns = computed(() => props.columns.filter((c) => !c.name.includes('_internal_') && props.visibleColumns[c.name]))

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

function createFileValue(val: string, done: (item: string, mode: string) => void) {
    if (val.length > 0) {
        const file = removeInvalidCharsFromFilename(val.trim().replace('.csv', '') + '.csv')
        if (!availableFiles.value.includes(file)) {
            availableFiles.value.push(file)
        }
        done(file, 'toggle')
    }
}

function filterFiles(val: string, update: (a: () => void) => void) {
    update(() => {
        if (val === '') {
            availableFiles.value = getAllCardFiles()
        } else {
            const needle = val.toLowerCase()
            availableFiles.value = getAllCardFiles().filter((v) => v.toLowerCase().indexOf(needle) > -1)
        }
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

function createTagValue(val: string, done: (item: string, mode: string) => void) {
    if (val.length > 0) {
        if (!availableTags.value.includes(val)) {
            availableTags.value.push(val)
        }
        done(val, 'toggle')
    }
}

function filterTags(val: string, update: (a: () => void) => void) {
    update(() => {
        if (val === '') {
            availableTags.value = getAllTags()
        } else {
            const needle = val.toLowerCase()
            availableTags.value = getAllTags().filter((v) => v.toLowerCase().indexOf(needle) > -1)
        }
    })
}
</script>
<template>
    <div class="row wrap justify-start">
        <q-table class="w-full" :rows="getSortedCards()" :columns="columns" flat hide-bottom row-key="id" virtual-scroll :rows-per-page-options="[0]" dense>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        <q-input dense filled v-model="props.row.name" />
                    </q-td>
                    <q-td key="tags" :props="props">
                        <q-select
                            use-input
                            @filter="filterTags"
                            @new-value="createTagValue"
                            dense
                            filled
                            label="Tags"
                            v-model="props.row.tags"
                            multiple
                            :options="availableTags"
                        />
                    </q-td>
                    <q-td key="source" :props="props">
                        <q-select
                            use-input
                            @filter="filterFiles"
                            @new-value="createFileValue"
                            dense
                            filled
                            label="Source file"
                            v-model="props.row.source"
                            :options="availableFiles"
                        />
                    </q-td>
                    <q-td v-for="column in variableColumns" :key="column.name" :props="props">
                        <AutocompleteInput
                            :includeFonts="true"
                            :includeImages="true"
                            :include-colors="true"
                            :include-icons="true"
                            v-model="props.row.variables[column.name]"
                            type="filled"
                        />
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
                        <div class="row justify-end">
                            <q-btn icon="edit" flat round @click.prevent="goToCardEdit(props.row.id)" dense />
                            <q-btn icon="delete" flat round @click.prevent="onRemoveCard(props.row.id)" dense />
                            <q-btn icon="content_copy" flat round @click.prevent="onDuplicateCard(props.row.id)" dense />
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

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { cardStore } from '../../stores/cards-store.js'
import { computed, nextTick, reactive, ref } from 'vue'
import { Card } from '../../typings/card.js'
import duplicateCard from '../../helpers/duplicate-card.js'
import { QInput, useQuasar } from 'quasar'
import removeCard from '../../helpers/stores/io-utils/remove-card.js'
import generateId from '../../helpers/generate-id.js'
import sortCardsByIndex from '../../helpers/sort-cards-by-index.js'
import getAllTags from '../../helpers/get-all-tags.js'
import getAllCardFiles from '../../helpers/get-all-card-files.js'
import removeInvalidCharsFromFilename from '../../helpers/remove-invalid-chars-from-filename.js'
import getCardSize from '../../helpers/get-card-size.js'

const router = useRouter()
const $q = useQuasar()

const props = defineProps<{
    filterTags: string[]
    searchText: string
    columns: { name: string; label: string }[]
    visibleColumns: Record<string, boolean>
}>()

const tableRef = ref()
const availableTags = ref<string[]>(getAllTags())
const availableFiles = ref<string[]>(getAllCardFiles())
const pagination = ref({
    rowsPerPage: 0,
})

const selectOpen = reactive<Record<string, boolean>>({})

function isSelectOpen(row: number, col: number) {
    return !!selectOpen[getKey(row, col)]
}

function setSelectOpen(row: number, col: number, value: boolean) {
    selectOpen[getKey(row, col)] = value
}

const previewSize = computed(() => {
    const scale = 0.6
    const size = getCardSize()
    const ratio = 200 / size.width
    return {
        width: `${200 * scale}px`,
        height: `${ratio * size.height * scale}px`,
    }
})

const columns = computed(() => {
    const computedColumns = []
    if (props.visibleColumns._internal_name) {
        computedColumns.push({
            field: 'name',
            name: 'name',
            align: 'left',
            label: 'Name',
            sortable: true,
        })
    }
    if (props.visibleColumns._internal_tags) {
        computedColumns.push({ name: 'tags', label: 'Tags', align: 'left', field: 'tags' })
    }

    if (props.visibleColumns._internal_source) {
        computedColumns.push({ name: 'source', label: 'Source', align: 'left', field: 'source', sortable: true })
    }

    if (props.visibleColumns._internal_amount) {
        computedColumns.push({ name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true })
    }

    for (const variableColumn of props.columns) {
        if (!variableColumn.name.includes('_internal') && props.visibleColumns[variableColumn.name]) {
            computedColumns.push({
                field: (entry: Card) => entry.variables[variableColumn.name],
                name: variableColumn.name,
                label: variableColumn.label,
                align: 'left',
                sortable: true,
            })
        }
    }

    if (props.visibleColumns._internal_front) {
        computedColumns.push({ name: 'front', label: 'Front side', align: 'center' })
    }

    if (props.visibleColumns._internal_back) {
        computedColumns.push({ name: 'back', label: 'Back side', align: 'center' })
    }

    computedColumns.push({ name: 'actions', label: '', align: 'right' })

    return computedColumns
})

const variableColumns = computed(() => props.columns.filter((c) => !c.name.includes('_internal_') && props.visibleColumns[c.name]))

const goToCardEdit = (cardId: string) => {
    router.push({ name: 'EditCard', query: { cardId } })
}

async function scrollToRow(row: number) {
    tableRef.value?.scrollTo(row)
    await nextTick()
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

const rows = computed(() => {
    const cards = Object.values(cardStore.cards)
    return sortCardsByIndex(cards.filter(isCardVisible))
})

const inputRefs = reactive<Record<string, InputInstance | null>>({})
type InputInstance = InstanceType<typeof QInput>

function getKey(row: number, col: number): string {
    return `${row}_${col}`
}

function setInputRef(el: InputInstance | null, row: number, col: number): void {
    inputRefs[getKey(row, col)] = el
}

async function focusCell(row: number, col: number) {
    await scrollToRow(row)
    const el = inputRefs[getKey(row, col)]
    if (!el) return false
    el?.focus()
    return true
}

async function onKeydown(e: KeyboardEvent, row: number, col: number): Promise<boolean> {
    if (isSelectOpen(row, col) && ['Tab', 'ArrowUp', 'ArrowDown'].includes(e.key)) return true
    const maxRow = rows.value.length
    const maxCol = variableColumns.value.length + 4
    let directionRow = 0
    let directionCol = 0

    if (e.key === 'Tab') {
        e.preventDefault()
        if (e.shiftKey) {
            directionCol = -1
        } else {
            directionCol = 1
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        directionRow = 1
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()
        directionRow = -1
    }

    let newCol = directionCol + col
    let newRow = directionRow + row
    while (newCol >= 0 && newCol < maxCol && newRow >= 0 && newRow < maxRow) {
        if (await focusCell(newRow, newCol)) return true
        newCol += directionCol
        newRow += directionRow
    }

    return true
}
</script>
<template>
    <div class="row wrap justify-start">
        <q-table
            ref="tableRef"
            class="w-full full-height"
            :rows="rows"
            :columns="columns"
            flat
            hide-bottom
            row-key="id"
            virtual-scroll
            :rows-per-page-options="[0]"
            dense
            v-model:pagination="pagination"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        <q-input
                            v-model="props.row.name"
                            dense
                            filled
                            :debounce="500"
                            :ref="(el: InputInstance) => setInputRef(el, props.pageIndex, 0)"
                            @keydown="(e: KeyboardEvent) => onKeydown(e, props.pageIndex, 0)"
                        />
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
                            :ref="(el: InputInstance) => setInputRef(el, props.pageIndex, 1)"
                            @keydown.capture="(e: KeyboardEvent) => onKeydown(e, props.pageIndex, 1)"
                            @popup-show="setSelectOpen(props.pageIndex, 1, true)"
                            @popup-hide="setSelectOpen(props.pageIndex, 1, false)"
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
                            :ref="(el: InputInstance) => setInputRef(el, props.pageIndex, 2)"
                            @keydown.capture="(e: KeyboardEvent) => onKeydown(e, props.pageIndex, 2)"
                            @popup-show="setSelectOpen(props.pageIndex, 2, true)"
                            @popup-hide="setSelectOpen(props.pageIndex, 2, false)"
                        />
                    </q-td>
                    <q-td key="amount" :props="props">
                        <q-input
                            v-model="props.row.amount"
                            dense
                            filled
                            type="number"
                            :debounce="1000"
                            :ref="(el: InputInstance) => setInputRef(el, props.pageIndex, 3)"
                            @keydown="(e: KeyboardEvent) => onKeydown(e, props.pageIndex, 3)"
                        />
                    </q-td>
                    <q-td v-for="(column, index) in variableColumns" :key="column.name" :props="props">
                        <AutocompleteInput
                            :includeFonts="true"
                            :includeImages="true"
                            :include-colors="true"
                            :include-icons="true"
                            v-model="props.row.variables[column.name]"
                            type="filled"
                            :ref="(el: InputInstance) => setInputRef(el, props.pageIndex, 4 + index)"
                            @keydown="(e: KeyboardEvent) => onKeydown(e, props.pageIndex, 4 + index)"
                        />
                    </q-td>
                    <q-td key="front" :props="props">
                        <Fit :style="{ width: previewSize.width, height: previewSize.height }">
                            <RenderedCard :card="props.row" side="front" />
                        </Fit>
                    </q-td>
                    <q-td key="back" :props="props">
                        <Fit :style="{ width: previewSize.width, height: previewSize.height }">
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

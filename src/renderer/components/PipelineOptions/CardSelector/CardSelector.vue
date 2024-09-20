<script lang="ts" setup>
    import { computed } from 'vue';
    import { cardStore } from '../../../stores/cards-store.js';
    import { Card } from '../../../typings/card.js';

    const show = defineModel<boolean>('show')
    const cards = defineModel<{ [key: string]: number }>('cards')
    const rows = computed(() => Object.values(cardStore.cards))

    const cardSelectorColumns = [
        {
            name: 'ammount',
            label: 'Ammount',
            field: 'name',
            sortable: true,
            sort: (a: string, b: string, rowA: Card, rowB: Card) => {
                return (cards!.value![rowA.name] ?? 0) - (cards!.value![rowB.name] ?? 0)
            },
        },
        { name: 'front', label: 'Front', align: 'center', style: 'width: 20px' },
        { name: 'back', label: 'Back', align: 'center', style: 'width: 20px' },
        { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'end' },
    ]



</script>
<template>
    <q-dialog v-model="show">
        <q-card>
            <q-card-section>
                <q-table title="Cards" :rows="rows" :columns="cardSelectorColumns" row-key="name">
                    <template v-slot:body-cell-front="props">
                        <q-td :props="props">
                            <Fit class="icon-cell">
                                <RenderedCard :card="props.row" :templates-names="props.row.frontsideTemplates" />
                            </Fit>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-back="props">
                        <q-td :props="props">
                            <Fit class="icon-cell">
                                <RenderedCard :card="props.row" :templates-names="props.row.backsideTemplates" />
                            </Fit>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-ammount="props">
                        <q-td :props="props">
                            <q-input class="w-20" type="number" dense outlined v-model="cards![props.row.name]"
                                debounce="1000" />
                        </q-td>
                    </template>
                </q-table>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<style lang="scss" scoped>
    .icon-cell {
        width: 100px;
        height: 50px;
    }
</style>
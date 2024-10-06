<script lang="ts" setup>
    import { onBeforeRouteLeave, useRoute } from 'vue-router';
    import { computed, ref } from 'vue';
    import { cardStore } from '../stores/cards-store.js';
    import duplicateCard from '../helpers/duplicate-card.js';
    import { Card } from '../typings/card.js';
    import { useQuasar } from 'quasar';
    import { isEqual } from 'lodash'
    import isValidName from '../helpers/validators/is-valid-name.js';
    import { projectConfigStore } from '../stores/project-config-store.js';

    const $q = useQuasar()

    const route = useRoute();
    const cardSize = computed(() => `${projectConfigStore.filters.editCard.cardSize}px`)


    const cardName = route.query.cardName?.toString() || '';
    const originalCard = cardStore.cards[cardName];

    const card = ref<Card>(duplicateCard(originalCard));

    function saveCard() {
        if (card.value.name !== cardName) {
            cardStore.removeCard(cardName)
        }
        cardStore.setCard(card.value.name, card.value)
    }

    const isValid = computed(() => !!card.value.name && isValidName(card.value.name))

    onBeforeRouteLeave(() => {
        if (isEqual(originalCard, card.value)) return true
        return new Promise(resolve => {
            $q.dialog({
                title: 'Unsaved changes',
                message: `Are you sure you want to leave? There are unsaved changes.`,
                cancel: true,
            }).onOk(() => {
                resolve(true)
            }).onCancel(() => resolve(false))
                .onDismiss(() => resolve(false))
        })
    })


</script>

<template>
    <ContentPad>
        <div class="column container">
            <div class="col-auto">
                <q-btn push icon="arrow_back" align="left" to="/cards" no-caps>Back to cards</q-btn>
            </div>
            <div class="col row">
                <CardComponents class="settings-container" v-model="card" />
                <div class="col column">
                    <Filterbar class="col-auto my-2 ml-3 p-2"
                        v-model:cardSize="projectConfigStore.filters.editCard.cardSize" :hide-search="true">
                        <q-checkbox class="ml-2" left-label v-model="projectConfigStore.filters.editCard.showFront"
                            label="Frontside" />
                        <q-checkbox class="ml-2" left-label v-model="projectConfigStore.filters.editCard.showBack"
                            label="Backside" />
                    </Filterbar>
                    <div class="col">
                        <q-scroll-area class="w-full h-full">
                            <div class="row justify-center">
                                <div class="column side-container ml-2 mt-2"
                                    v-if="projectConfigStore.filters.editCard.showFront">
                                    Front side:
                                    <div class="card-container">
                                        <Fit>
                                            <RenderedCard class="side-container" :card="card"
                                                :templatesNames="card.frontsideTemplates" />
                                        </Fit>
                                    </div>
                                </div>
                                <div class="column side-container ml-2 mt-2"
                                    v-if="projectConfigStore.filters.editCard.showBack">
                                    Back side:
                                    <div class="card-container">
                                        <Fit>
                                            <RenderedCard class="side-container" :card="card"
                                                :templatesNames="card.backsideTemplates" />
                                        </Fit>
                                    </div>
                                </div>
                            </div>
                        </q-scroll-area>
                    </div>
                </div>
            </div>
            <div class="col-auto row mt-2 justify-end content-start">
                <q-btn push to="/cards" color="primary" :disable="!isValid" @click="saveCard" no-caps>Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
    .container {
        height: 100%;
        max-width: 100%;
    }

    .side-container {
        width: v-bind('cardSize');
    }

    .settings-container {
        width: 400px;
    }

    .card-container {
        width: 100%;
        flex: 1;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
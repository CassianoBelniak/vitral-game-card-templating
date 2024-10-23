<script lang="ts" setup>
    import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
    import { computed, ref } from 'vue';
    import { cardStore } from '../stores/cards-store.js';
    import duplicateCard from '../helpers/duplicate-card.js';
    import { Card } from '../typings/card.js';
    import { useQuasar } from 'quasar';
    import { isEqual } from 'lodash'
    import isValidName from '../helpers/validators/is-valid-name.js';
    import { projectConfigStore } from '../stores/project-config-store.js';
    import removeInvalidTemplatesFromCard from '../helpers/remove-invalid-templates-from-card.js';
    import renameCard from '../helpers/stores/io-utils/rename-card.js';

    const $q = useQuasar()
    const router = useRouter();

    const route = useRoute();
    const cardSize = computed(() => `${projectConfigStore.filters.editCard.cardSize}px`)

    const cardName = route.query.cardName?.toString() || '';
    const originalCard = cardStore.cards[cardName];

    const copy = duplicateCard(originalCard)
    removeInvalidTemplatesFromCard(copy)
    const card = ref<Card>(copy);
    const skipLeaveMessage = ref(false)

    function saveCard() {
        skipLeaveMessage.value = true
        delete cardStore.cards[cardName] // In case the card was renamed
        renameCard(cardName, card.value.name)
        cardStore.cards[card.value.name] = card.value
        router.push({ name: 'Cards' })
    }

    const isValid = computed(() => !!card.value.name && isValidName(card.value.name) && (!Object.keys(cardStore.cards).includes(card.value.name) || card.value.name === cardName))

    onBeforeRouteLeave(() => {
        if (skipLeaveMessage.value) return true
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
                        <InspectArea class="w-full h-full ml-2"
                            v-model:zoom="projectConfigStore.filters.editCard.cardSize">
                            <div class="cards">
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
                        </InspectArea>
                    </div>
                </div>
            </div>
            <div class="col-auto row mt-2 justify-end content-start">
                <q-btn push color="primary" :disable="!isValid" @click="saveCard" no-caps>Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
    .container {
        height: 100%;
        max-width: 100%;
    }

    .cards {
        display: inline-flex;
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
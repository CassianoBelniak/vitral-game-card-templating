<script lang="ts" setup>
    import { onBeforeRouteLeave, useRoute } from 'vue-router';
    import { ref } from 'vue';
    import { cardStore } from '../stores/cards-store.js';
    import duplicateCard from '../helpers/duplicate-card.js';
    import { Card } from '../typings/card.js';
    import { useQuasar } from 'quasar';
    import { isEqual } from 'lodash'

    const $q = useQuasar()

    const route = useRoute();


    const cardName = route.query.cardName?.toString() || '';
    const originalCard = cardStore.cards[cardName];

    const card = ref<Card>(duplicateCard(originalCard));

    function saveCard() {
        if (card.value.name !== cardName) {
            cardStore.removeCard(cardName)
        }
        cardStore.setCard(card.value.name, card.value)
    }

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
                <div class="settings-container">
                    <CardComponents v-model="card" />
                </div>
                <div class="card-container">
                    <Fit>
                        <RenderedCard class="template" :card="card" :templatesNames="card.frontsideTemplates" />
                    </Fit>
                </div>
                <div class="card-container">
                    <Fit>
                        <RenderedCard class="template" :card="card" :templatesNames="card.backsideTemplates" />
                    </Fit>
                </div>
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn push to="/cards" color="primary" @click="saveCard" no-caps>Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
    .container {
        height: 100%;
        max-width: 100%;
    }

    .settings-container {
        width: 400px;
    }

    .card-container {
        flex: 1;
        position: relative;
        max-height: 100%;
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
</style>
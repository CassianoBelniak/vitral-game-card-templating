<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { cardStore } from '../../stores/cards-store.js';

const router = useRouter();

const goToCardEdit = (cardName: string) => {
    router.push({ name: 'EditCard', query: { cardName } })
};

</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(card, index) in cardStore.cards" :key="index">
            <q-card class="template-card" @click="goToCardEdit(card.name)">
                <q-card-section class="image">
                    <Fit>
                        <RenderedCard :card="card" :templatesNames="card.frontsideTemplates" />
                    </Fit>
                </q-card-section>
                <q-card-section class="image">
                    <Fit>
                        <RenderedCard :card="card" :templatesNames="card.backsideTemplates" />
                    </Fit>
                </q-card-section>
                <q-card-section>
                    <div>{{ card.name }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}

.image {
    width: 100%;
    height: 50%;
}

.template-card {
    height: 150px;
    margin-right: 20px;
    cursor: pointer;
}
</style>
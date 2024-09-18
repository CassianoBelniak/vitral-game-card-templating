<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import { cardStore } from '../../stores/cards-store.js';
    import { computed } from 'vue';
    import { Card } from '../../typings/card.js';

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

</script>
<template>
    <div class="row wrap justify-start">
        <div class="card-container col-auto" v-for="(card, index) in cardStore.cards" :key="index">
            <div class="template-card" @click="goToCardEdit(card.name)" v-if="isCardVisible(card)">
                <div class="row">
                    <div class="image" v-if="showFront">
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
                <div>
                    <div>{{ card.name }}</div>
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
        padding-right: 5px;
        width: v-bind('cardSize');
    }

    .template-card {
        margin-right: 20px;
        cursor: pointer;
    }
</style>
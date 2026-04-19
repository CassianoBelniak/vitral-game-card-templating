import { cardStore } from '../stores/cards-store.js'
import { ExportPipeline } from '../typings/export.js'

export default function getPipelineCards(pipeline: ExportPipeline) {
    const cards = []
    for (const cardId of Object.keys(cardStore.cards)) {
        const amount = pipeline.cards[cardId] ?? cardStore.cards[cardId].amount ?? 1
        for (let c = 0; c < amount; c += 1) {
            if (cardStore.cards[cardId]) {
                cards.push(cardStore.cards[cardId])
            }
        }
    }
    return cards
}

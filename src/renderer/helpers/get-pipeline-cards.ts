import { cardStore } from '../stores/cards-store.js'
import { ExportPipeline } from '../typings/export.js'

export default function getPipelineCards(pipeline: ExportPipeline) {
    const cards = []
    for (const cardId of Object.keys(cardStore.cards)) {
        const ammount = pipeline.cards[cardId] ?? cardStore.cards[cardId].ammount ?? 1
        for (let c = 0; c < ammount; c += 1) {
            if (cardStore.cards[cardId]) {
                cards.push(cardStore.cards[cardId])
            }
        }
    }
    return cards
}

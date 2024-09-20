import { cardStore } from '../stores/cards-store.js'
import { ExportPipeline } from '../typings/export.js'

export default function getPipelineCards(pipeline: ExportPipeline) {
    const cards = []
    for (const [cardName, ammount] of Object.entries(pipeline.cards)) {
        for (let c = 0; c < ammount; c += 1) {
            if (cardStore.cards[cardName]) {
                cards.push(cardStore.cards[cardName])
            }
        }
    }
    return cards
}

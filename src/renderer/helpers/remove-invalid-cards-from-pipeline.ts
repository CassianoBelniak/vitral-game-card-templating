import { cardStore } from '../stores/cards-store.js'
import { ExportPipeline } from '../typings/export.js'

export default function removeInvalidCardsFromPipeline(pipeline: ExportPipeline) {
    for (const card of Object.keys(pipeline.cards)) {
        if (!cardStore.cards[card]) {
            delete pipeline.cards[card]
        }
    }
}

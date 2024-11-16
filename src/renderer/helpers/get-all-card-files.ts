import { cardStore } from '../stores/cards-store.js'

export default function getAllCardFiles() {
    const files: string[] = []
    for (const card of Object.values(cardStore.cards)) {
        if (!files.includes(card.source)) {
            files.push(card.source)
        }
    }
    return files
}

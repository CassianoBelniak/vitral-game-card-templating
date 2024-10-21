import { cardStore } from '../stores/cards-store.js'

export default function getAllTags() {
    const tags: string[] = []
    for (const card of Object.values(cardStore.cards)) {
        for (const tag of card.tags) {
            if (!tags.includes(tag)) {
                tags.push(tag)
            }
        }
    }
    return tags
}

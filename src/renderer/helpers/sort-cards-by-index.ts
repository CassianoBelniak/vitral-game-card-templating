import { Card } from '../typings/card.js'

export default function sortCardsByIndex(cards: Card[]) {
    return cards.sort((cardA, cardB) => {
        if (cardA.index > cardB.index) return 1
        if (cardA.index < cardB.index) return -1
        return 0
    })
}

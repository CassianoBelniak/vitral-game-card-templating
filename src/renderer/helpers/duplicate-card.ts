import { Card } from '../typings/card.js'

export default function duplicateCard(card: Card | undefined): Card {
    if (!card) {
        return {
            name: '',
            ammount: 1,
            frontsideTemplates: [],
            backsideTemplates: [],
            variables: {},
            tags: [],
        }
    }
    const newCard = JSON.parse(JSON.stringify(card))
    return newCard
}

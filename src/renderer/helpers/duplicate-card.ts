import { Card } from '../typings/card.js'
import generateId from './generate-id.js'

export default function duplicateCard(card: Card | undefined): Card {
    if (!card) {
        return {
            id: generateId(),
            index: Infinity,
            name: '',
            frontsideTemplates: [],
            backsideTemplates: [],
            variables: {},
            tags: [],
            ammount: 1,
            source: 'cards.csv',
        }
    }
    const newCard = JSON.parse(JSON.stringify(card)) as Card
    return newCard
}


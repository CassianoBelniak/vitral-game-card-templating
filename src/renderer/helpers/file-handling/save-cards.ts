import { stringify } from 'csv-stringify/sync'
import { Card } from '../../typings/card.js'

function simplifyCard(card: Card) {
    const simplifiedCard = { ...card.variables }
    simplifiedCard.name = card.name
    simplifiedCard.tags = card.tags.join(',')
    simplifiedCard.ammount = String(card.ammount)
    simplifiedCard.frontsideTemplates = card.frontsideTemplates.join(',')
    simplifiedCard.backsideTemplates = card.backsideTemplates.join(',')
    return simplifiedCard
}

export async function saveCards(cards: Record<string, Card>, path: string) {
    const simplifiedCards = Object.values(cards).map(simplifyCard)
    const content = stringify(simplifiedCards, { header: true })
    await window.electronAPI.saveFile(path, Buffer.from(content))
}

import { stringify } from 'csv-stringify/sync'
import { Card } from '../../typings/card.js'
import sortCardsByIndex from '../sort-cards-by-index.js'
import hash from '../hash.js'
import { hashStore } from '../../stores/hash-store.js'

function simplifyCard(card: Card) {
    const simplifiedCard = { ...card.variables }
    simplifiedCard.id = card.id
    simplifiedCard.name = card.name
    simplifiedCard.tags = card.tags.join(',')
    simplifiedCard.ammount = String(card.ammount)
    simplifiedCard.frontsideTemplates = card.frontsideTemplates.join(',')
    simplifiedCard.backsideTemplates = card.backsideTemplates.join(',')
    return simplifiedCard
}

function getColumns(simplifiedCards: Record<string, string>[]) {
    const columns: Set<string> = new Set()
    for (const card of simplifiedCards) {
        Object.keys(card).forEach((key) => columns.add(key))
    }
    return [...columns]
}

function groupCardsIntoFiles(cards: Card[]) {
    const files: Record<string, Record<string, string>[]> = {}
    const sortedCards = sortCardsByIndex(cards)
    for (const card of sortedCards) {
        const simplifiedCard = simplifyCard(card)
        const source = card.source || 'cards.csv'
        if (!files[source]) {
            files[source] = []
        }
        files[card.source].push(simplifiedCard)
    }
    return files
}

export async function saveCards(cards: Record<string, Card>, path: string) {
    const files = groupCardsIntoFiles(Object.values(cards))
    for (const [file, simplifiedCards] of Object.entries(files)) {
        const columns = getColumns(simplifiedCards)
        const content = stringify(simplifiedCards, { header: true, columns })
        const hashedFile = hash(content)
        console.log(hashStore.cardFileHashes)
        if (hashStore.cardFileHashes[`${path}/${file}`] === hashedFile) continue
        hashStore.cardFileHashes[`${path}/${file}`] = hashedFile
        await window.electronAPI.saveFile(`${path}/${file}`, Buffer.from(content))
    }
}

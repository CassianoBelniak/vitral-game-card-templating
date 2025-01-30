import { stringify } from 'csv-stringify/sync'
import { Card } from '../../typings/card.js'
import sortCardsByIndex from '../sort-cards-by-index.js'

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

async function deleteOldFiles(path: string) {
    const files = await window.electronAPI.listFiles(path)
    for (const file of files) {
        if (file.includes('.csv')) {
            await window.electronAPI.deleteFile(`${path}/${file}`)
        }
    }
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
    await deleteOldFiles(path)
    const files = groupCardsIntoFiles(Object.values(cards))
    for (const [file, simplifiedCards] of Object.entries(files)) {
        const columns = getColumns(simplifiedCards)
        const content = stringify(simplifiedCards, { header: true, columns })
        await window.electronAPI.saveFile(`${path}/${file}`, Buffer.from(content))
    }
}

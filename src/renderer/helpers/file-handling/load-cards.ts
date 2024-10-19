import { parse } from 'csv-parse/sync'
import { Card } from '../../typings/card.js'

const CARD_FIELDS = ['name']
const ARRAY_FIELDS = ['frontsideTemplates', 'backsideTemplates', 'tags']

function getNewCard(): Card {
    return {
        name: '',
        tags: [],
        frontsideTemplates: [],
        backsideTemplates: [],
        variables: {},
    }
}

function normalizeName(name: string) {
    return name.trim()
}

function parseCard(record: Record<string, string>) {
    const card = getNewCard()
    card.name = record['name']
    card.frontsideTemplates = record['frontsideTemplates'].split(',').map(normalizeName)
    card.backsideTemplates = record['backsideTemplates'].split(',').map(normalizeName)
    card.tags = record['tags'].split(',').map(normalizeName)
    delete record['name']
    delete record['tags']
    delete record['frontsideTemplates']
    delete record['backsideTemplates']
    card.variables = record
    return card
}

export async function loadCards(path: string): Promise<Record<string, Card>> {
    const data = await window.electronAPI.loadFile(path)
    const csv = atob(data!)
    if (!csv) return {}
    const records = parse(csv, {
        columns: true,
        skip_empty_lines: true,
    })
    const cards = records.map(parseCard)
    return cards.reduce((acc: Record<string, Card>, card: Card) => {
        acc[card.name] = card
        return acc
    }, {})
}

import { parse } from 'csv-parse/sync'
import { Card } from '../../typings/card.js'
import { showError } from '../notify.js'
import decodeBase64 from '../decode-base64.js'
import generateId from '../generate-id.js'

function getNewCard(): Card {
    return {
        id: 'new-id',
        index: 0,
        name: '',
        tags: [],
        ammount: 0,
        frontsideTemplates: [],
        backsideTemplates: [],
        variables: {},
        source: 'cards.csv',
    }
}

function normalizeName(name: string) {
    return name.trim()
}

function parseCard(record: Record<string, string>, source: string, index: number) {
    const card = getNewCard()
    card.id = record['id'] || generateId()
    card.name = record['name']
    card.source = source
    card.index = index
    card.frontsideTemplates = record['frontsideTemplates'].split(',').map(normalizeName)
    card.backsideTemplates = record['backsideTemplates'].split(',').map(normalizeName)
    card.tags = record['tags'].split(',').map(normalizeName)
    card.ammount = +record['ammount']
    delete record['name']
    delete record['tags']
    delete record['frontsideTemplates']
    delete record['backsideTemplates']
    card.variables = record
    return card
}

export async function loadCards(path: string, rootFolder: string): Promise<Record<string, Card>> {
    try {
        const data = await window.electronAPI.loadFile(path)
        const csv = decodeBase64(data!)
        if (!csv) return {}
        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true,
        }) as Record<string, string>[]
        const source = path.split(rootFolder + '/')[1]
        const cards = records.map((record, index) => parseCard(record, source, index))
        return cards.reduce((acc: Record<string, Card>, card: Card) => {
            if (acc[card.id]) {
                card.id = generateId()
            }
            acc[card.id] = card
            return acc
        }, {})
    } catch (error: unknown) {
        showError('Error loading cards', error as Error)
        return {}
    }
}

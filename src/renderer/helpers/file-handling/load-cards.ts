import { parse } from 'csv-parse/sync'
import { Card } from '../../typings/card.js'
import { showError } from '../notify.js'
import decodeBase64 from '../decode-base64.js'

function getNewCard(): Card {
    return {
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

function parseCard(record: Record<string, string>, source: string) {
    const card = getNewCard()
    card.name = record['name']
    card.source = source
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
        const cards = records.map((record) => parseCard(record, source))
        return cards.reduce((acc: Record<string, Card>, card: Card) => {
            acc[card.name] = card
            return acc
        }, {})
    } catch (error: unknown) {
        showError('Error loading cards', error as Error)
        return {}
    }
}

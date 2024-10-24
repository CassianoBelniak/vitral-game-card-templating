import { parse } from 'csv-parse/sync'
import { Card } from '../../typings/card.js'
import notify, { showError } from '../notify.js'

function getNewCard(): Card {
    return {
        name: '',
        tags: [],
        ammount: 0,
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
    card.ammount = +record['ammount']
    delete record['name']
    delete record['tags']
    delete record['frontsideTemplates']
    delete record['backsideTemplates']
    card.variables = record
    return card
}

export async function loadCards(path: string): Promise<Record<string, Card>> {
    try {
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
    } catch (error: unknown) {
        showError('Error loading cards', error as Error)
        return {}
    }
}

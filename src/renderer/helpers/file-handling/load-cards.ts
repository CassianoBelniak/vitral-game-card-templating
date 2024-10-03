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

function parseCard(line: Array<string>, header: Array<string>) {
    const card = getNewCard()
    for (let i = 0; i < header.length; i++) {
        const field = header[i] as keyof Card | 'variables'
        if (CARD_FIELDS.includes(header[i])) {
            card[field] = line[i]
        } else if (ARRAY_FIELDS.includes(header[i])) {
            card[field] = line[i].split(',').filter((i) => i)
        } else {
            card.variables[header[i]] = line[i]
        }
    }
    return card
}

export async function loadCards(path: string): Promise<Record<string, Card>> {
    const data = await window.electronAPI.loadFile(path)
    const csv = atob(data!)
    if (csv) {
        const lines = csv
            .split('\n')
            .filter((line) => line)
            .map((line) => line.split(';'))
        const header = lines.shift() || []
        const cards = lines.map((line) => parseCard(line, header))
        return cards.reduce((acc: Record<string, Card>, card: Card) => {
            acc[card.name] = card
            return acc
        }, {})
    }
    return {}
}

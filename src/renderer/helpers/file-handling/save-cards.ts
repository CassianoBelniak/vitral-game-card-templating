import { Card } from '../../typings/card.js'

function getHeaders(cards: Record<string, Card>) {
    const anyCard = Object.values(cards)[0]
    const headers = Object.keys(anyCard).filter((key) => key !== 'variables')
    for (const card of Object.values(cards)) {
        for (const key of Object.keys(card.variables)) {
            if (!headers.includes(key)) {
                headers.push(key)
            }
        }
    }
    return headers
}

function simplifyCard(card: Card) {
    console.log(card)
    const simplifiedCard = { ...card.variables }
    simplifiedCard.name = card.name
    simplifiedCard.ammount = String(card.ammount)
    simplifiedCard.tags = card.tags.join(',')
    simplifiedCard.frontsideTemplates = card.frontsideTemplates.join(',')
    simplifiedCard.backsideTemplates = card.backsideTemplates.join(',')
    return simplifiedCard
}

export async function saveCards(cards: Record<string, Card>, path: string) {
    let content = ''
    const headers = getHeaders(cards)
    content += headers.join(';') + '\n'
    for (const card of Object.values(cards)) {
        const values = simplifyCard(card)
        for (const key of headers) {
            const value = String(values[key]) || ''
            content += value + ';'
        }
        content += '\n'
    }
    await window.electronAPI.saveFile(path, Buffer.from(content))
}

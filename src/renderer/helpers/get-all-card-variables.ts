import { templatesStore } from '../stores/templates-store.js'
import { Card } from '../typings/card.js'

export default function getAllCardVariables(cards: Card[]) {
    const templates = [...new Set(cards.map((card) => [...card.frontsideTemplates, ...card.backsideTemplates]).flat())]
    return [...new Set(templates.map((template) => templatesStore.templates[template]?.getVariables()).flat())]
}


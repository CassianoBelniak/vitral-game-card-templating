import { templatesStore } from '../stores/templates-store.js'
import { Card } from '../typings/card.js'

function filterValidTemplates(templateNames: string[]) {
    return templateNames.filter((templateName: string) => templatesStore.templates[templateName])
}

export default function duplicateCard(card: Card | undefined): Card {
    if (!card) {
        return {
            name: '',
            frontsideTemplates: [],
            backsideTemplates: [],
            variables: {},
            tags: [],
        }
    }
    const newCard = JSON.parse(JSON.stringify(card))
    newCard.frontsideTemplates = filterValidTemplates(newCard.frontsideTemplates)
    newCard.backsideTemplates = filterValidTemplates(newCard.backsideTemplates)
    return newCard
}

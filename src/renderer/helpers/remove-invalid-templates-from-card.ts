import { templatesStore } from '../stores/templates-store.js'
import { Card } from '../typings/card.js'

function templateExists(template: string) {
    return !!templatesStore.templates[template]
}

export default function removeInvalidTemplatesFromCard(card: Card) {
    card.backsideTemplates = card.backsideTemplates.filter(templateExists)
    card.frontsideTemplates = card.frontsideTemplates.filter(templateExists)
}

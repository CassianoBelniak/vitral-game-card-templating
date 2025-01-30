import { cardStore } from '../../../stores/cards-store.js'

export default function removeTemplate(templateName: string) {
    for (const card of Object.values(cardStore.cards)) {
        card.frontsideTemplates.filter((cardTemplate: string) => cardTemplate !== templateName)
        card.backsideTemplates.filter((cardTemplate: string) => cardTemplate !== templateName)
    }
}

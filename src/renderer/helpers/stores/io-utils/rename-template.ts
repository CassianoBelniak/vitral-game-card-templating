import { cardStore } from '../../../stores/cards-store.js'

function rename(templates: string[], templateFrom: string, templateTo: string) {
    for (let c = 0; c <= templates.length; c += 1) {
        if (templates[c] === templateFrom) {
            templates[c] = templateTo
        }
    }
}

export default function renameTemplate(templateFrom: string, templateTo: string) {
    for (const card of Object.values(cardStore.cards)) {
        rename(card.frontsideTemplates, templateFrom, templateTo)
        rename(card.backsideTemplates, templateFrom, templateTo)
    }
}

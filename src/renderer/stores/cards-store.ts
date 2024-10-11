import { reactive } from 'vue'
import { loadCards } from '../helpers/file-handling/load-cards.js'
import { saveCards } from '../helpers/file-handling/save-cards.js'
import { Card } from '../typings/card.js'
import { projectConfigStore } from './project-config-store.js'

const CARDS_FILE = 'assets/cards/cards.csv'
let saveTimer: NodeJS.Timeout | null = null

export const cardStore = reactive({
    signal: 0,
    cards: {} as Record<string, Card>,
    setCard(name: string, card: Card) {
        this.cards[name] = card
        triggerSave()
        this.signal = Math.random()
    },
    removeCard(cardName: string) {
        delete this.cards[cardName]
        triggerSave()
        this.signal = Math.random()
    },
    getAllCardTags() {
        const tags: string[] = []
        for (const card of Object.values(this.cards)) {
            for (const tag of card.tags) {
                if (!tags.includes(tag)) {
                    tags.push(tag)
                }
            }
        }
        return tags
    },
})

function triggerSave() {
    if (saveTimer) {
        clearTimeout(saveTimer)
    }
    saveTimer = setTimeout(async () => {
        saveCards(cardStore.cards, `${projectConfigStore.workingDirectory}/${CARDS_FILE}`)
    }, 1000)
}

async function onFileChanged(path: string, event: string) {
    if (path.includes(CARDS_FILE)) {
        if (event === 'add' || event === 'change') {
            cardStore.cards = await loadCards(path)
        }
        if (event === 'unlink') {
            cardStore.cards = {}
        }
        cardStore.signal = Math.random()
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)

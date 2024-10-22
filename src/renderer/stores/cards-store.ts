import { reactive, watch } from 'vue'
import { loadCards } from '../helpers/file-handling/load-cards.js'
import { saveCards } from '../helpers/file-handling/save-cards.js'
import { Card } from '../typings/card.js'
import { projectConfigStore } from './project-config-store.js'
import { isEqual } from 'lodash'

const CARDS_FILE = 'assets/cards/cards.csv'
let saveTimer: NodeJS.Timeout | null = null

export const cardStore = reactive({
    cards: {} as Record<string, Card>,
})

watch(cardStore, () => {
    console.log('triggered')
    triggerSave()
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
            const loadedCards = await loadCards(path)
            if (!isEqual(loadedCards, cardStore.cards)) {
                cardStore.cards = loadedCards
            }
        }
        if (event === 'unlink') {
            cardStore.cards = {}
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)

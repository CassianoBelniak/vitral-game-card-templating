import { reactive, watch } from 'vue'
import { loadCards } from '../helpers/file-handling/load-cards.js'
import { saveCards } from '../helpers/file-handling/save-cards.js'
import { Card } from '../typings/card.js'
import { projectConfigStore } from './project-config-store.js'
import { isEqual } from 'lodash'
import { showError } from '../helpers/notify.js'

const CARDS_FILE = 'assets/cards/cards.csv'
let saveTimer: NodeJS.Timeout | null = null
let skipSaving = false

export const cardStore = reactive({
    cards: {} as Record<string, Card>,
})

watch(cardStore, () => {
    triggerSave()
})

function triggerSave() {
    if (skipSaving) return
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
            try {
                skipSaving = true
                setTimeout(() => (skipSaving = false), 500)
                const loadedCards = await loadCards(path)
                if (!isEqual(loadedCards, cardStore.cards)) {
                    cardStore.cards = loadedCards
                }
            } catch (error: unknown) {
                showError('Error loading cards', error as Error)
                return {}
            }
        }
        if (event === 'unlink') {
            cardStore.cards = {}
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)

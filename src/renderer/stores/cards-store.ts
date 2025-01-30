import { reactive, watch } from 'vue'
import { loadCards } from '../helpers/file-handling/load-cards.js'
import { saveCards } from '../helpers/file-handling/save-cards.js'
import { Card } from '../typings/card.js'
import { projectConfigStore } from './project-config-store.js'
import { isEqual } from 'lodash'
import { showError } from '../helpers/notify.js'

const CARDS_FOLDER = 'assets/cards'
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
        saveCards(cardStore.cards, `${projectConfigStore.workingDirectory}/${CARDS_FOLDER}`)
    }, 1000)
}

async function loadAllFiles() {
    const files = await window.electronAPI.listFiles(`${projectConfigStore.workingDirectory}/${CARDS_FOLDER}`)
    const cards: Record<string, Card> = {}
    for (const file of files) {
        if (!file.includes('.csv')) continue
        const fileCards = await loadCards(`${projectConfigStore.workingDirectory}/${CARDS_FOLDER}/${file}`, CARDS_FOLDER)
        Object.assign(cards, fileCards)
    }
    return cards
}

async function onFileChanged(path: string, event: string) {
    if (path.includes(CARDS_FOLDER)) {
        if (event === 'add' || event === 'change') {
            try {
                skipSaving = true
                setTimeout(() => (skipSaving = false), 2000)
                const loadedCards = await loadAllFiles()
                if (!isEqual(loadedCards, cardStore.cards)) {
                    cardStore.cards = loadedCards
                }
            } catch (error: unknown) {
                showError('Error loading cards', error as Error)
                return {}
            }
        }
        if (event === 'unlink') {
            const loadedCards = await loadAllFiles()
            if (!isEqual(loadedCards, cardStore.cards)) {
                cardStore.cards = loadedCards
            }
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)

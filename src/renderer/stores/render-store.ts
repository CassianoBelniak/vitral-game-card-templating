import { reactive } from 'vue'
import { Card } from '../typings/card.js'
import getCardSize from '../helpers/get-card-size.js'
import CardRenderer from '../classes/card-renderer.js'
import hash from '../helpers/hash.js'

interface RenderCardParams {
    card: Card
    side: 'front' | 'back'
    priority?: boolean
}

export const renderStore = reactive({
    rendered: {} as Record<string, string>,
    cardQueue: {} as Record<string, RenderCardParams>,
    priorityCard: null as string | null,
    renderCount: 0 as number,
})

function queueCard(params: RenderCardParams, hash: string) {
    for (const queuedCardHash of Object.keys(renderStore.cardQueue)) {
        const queuedId = queuedCardHash.split('_')[0]
        if (queuedId === params.card.id && queuedCardHash !== hash) {
            delete renderStore.cardQueue[queuedCardHash]
        }
    }
    if (params.priority) {
        renderStore.priorityCard = hash
    }
    renderStore.cardQueue[hash] = params
}

function getNextCardInLine() {
    if (renderStore.priorityCard) {
        const renderParams = renderStore.cardQueue[renderStore.priorityCard]
        const renderHash = String(renderStore.priorityCard)
        return { renderHash, renderParams }
    }
    const [renderHash, renderParams] = Object.entries(renderStore.cardQueue)[0] || []
    return { renderHash, renderParams }
}

function getTemplates(params: RenderCardParams) {
    if (params.side === 'back') {
        return params.card.backsideTemplates
    }
    return params.card.frontsideTemplates
}

export async function processCardQueue() {
    const { renderHash, renderParams } = getNextCardInLine()
    if (!renderParams) return
    const size = getCardSize()
    const canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height
    const ctx = canvas.getContext('2d')
    const cardRenderer = new CardRenderer(ctx!)
    const templates = getTemplates(renderParams)
    await cardRenderer.applyCard(renderParams.card, templates)
    clearOldVersions(renderHash)
    renderStore.rendered[renderHash] = canvas.toDataURL('image/png')
    delete renderStore.cardQueue[renderHash]
    renderStore.renderCount += 1
}

function clearOldVersions(hash: string) {
    const id = hash.split('_')[0]
    for (const queuedCardHash of Object.keys(renderStore.rendered)) {
        const queuedId = queuedCardHash.split('_')[0]
        if (queuedId === id && queuedCardHash !== hash) {
            delete renderStore.rendered[queuedCardHash]
        }
    }
}

export function getRenderedCard(params: RenderCardParams) {
    const size = getCardSize()
    const hashedCard = `${params.card.id}${params.side}_${hash({ card: params.card, size, side: params.side })}`
    const renderedCard = renderStore.rendered[hashedCard] || null
    if (!renderedCard) {
        queueCard(params, hashedCard)
    }
    return renderedCard
}


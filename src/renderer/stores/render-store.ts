import { reactive } from 'vue'
import { Card } from '../typings/card.js'
import getCardSize from '../helpers/get-card-size.js'
import CardRenderer from '../classes/card-renderer.js'
import hash from '../helpers/hash.js'
import { PaintResultMetadata } from '../typings/painter.js'

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
    cardsMeta: {} as Record<string, PaintResultMetadata>,
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
        renderStore.priorityCard = null
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
    const paintMeta = await cardRenderer.applyCard(renderParams.card, templates)
    renderStore.cardsMeta[renderHash] = paintMeta
    clearOldVersions(renderHash)
    renderStore.rendered[renderHash] = canvas.toDataURL('image/png')
    delete renderStore.cardQueue[renderHash]
    renderStore.renderCount += 1
}

function clearOldVersions(hash: string, force = false) {
    const id = hash.split('_')[0]
    for (const queuedCardHash of Object.keys(renderStore.rendered)) {
        const queuedId = queuedCardHash.split('_')[0]
        if (queuedId === id && (queuedCardHash !== hash || force)) {
            delete renderStore.rendered[queuedCardHash]
        }
    }
}

export function invalidateCardsByImageName(imageName: string) {
    for (const [hashedCard, meta] of Object.entries(renderStore.cardsMeta)) {
        if (meta.usedImages.includes(imageName)) {
            clearOldVersions(hashedCard, true)
            renderStore.renderCount += 1
        }
    }
}

export function invalidateCardsByTemplateName(templateName: string) {
    for (const [hashedCard, meta] of Object.entries(renderStore.cardsMeta)) {
        if (meta.usedTemplates.includes(templateName)) {
            clearOldVersions(hashedCard, true)
            renderStore.renderCount += 1
        }
    }
}

export function invalidateCardsByFontName(fontName: string) {
    for (const [hashedCard, meta] of Object.entries(renderStore.cardsMeta)) {
        if (meta.usedFonts.includes(fontName)) {
            clearOldVersions(hashedCard, true)
            renderStore.renderCount += 1
        }
    }
}

export function getRenderedCard(params: RenderCardParams, skipQueue?: boolean) {
    const size = getCardSize()
    const hashedCard = `${params.card.id}${params.side}_${hash({ card: params.card, size, side: params.side })}`
    const renderedCard = renderStore.rendered[hashedCard] || null
    if (!renderedCard && !skipQueue) {
        queueCard(params, hashedCard)
    }
    return renderedCard
}


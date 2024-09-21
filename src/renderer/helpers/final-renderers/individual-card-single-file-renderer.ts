import CardRenderer from '../../classes/card-renderer.js'
import { projectConfigStore } from '../../stores/project-config-store.js'
import { Card } from '../../typings/card.js'
import { ExportPipeline } from '../../typings/export.js'
import convertToPixels from '../convert-to-pixels.js'
import delay from '../delay.js'

function getCanvas(pipeline: ExportPipeline) {
    const cardSizes = projectConfigStore.getParsedSizes()
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const cardSpacing = convertToPixels(pipeline.cardSidesSpacing, projectConfigStore.ppi)
    const canvas = document.createElement('canvas')
    canvas.width = cardSizes.width * 2 + marginX * 2 + cardSpacing
    canvas.height = cardSizes.height + marginY * 2
    return canvas
}

async function render(pipeline: ExportPipeline, card: Card) {
    const cardSizes = projectConfigStore.getParsedSizes()
    const canvas = getCanvas(pipeline)
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const cardSpacing = convertToPixels(pipeline.cardSidesSpacing, projectConfigStore.ppi)
    const context = canvas.getContext('2d')
    const cardRenderer = new CardRenderer(context!)
    cardRenderer.shift(marginX, marginY)
    await cardRenderer.applyCard(card, card.frontsideTemplates)
    cardRenderer.shift(cardSizes.width + cardSpacing, 0)
    await cardRenderer.applyCard(card, card.backsideTemplates)
    return canvas
}

export default async function* individualCardSingleFile(
    pipeline: ExportPipeline,
    cards: Card[],
): AsyncGenerator<HTMLCanvasElement, void, void> {
    for (const card of cards) {
        await delay(200)
        const front = await render(pipeline, card)
        yield front
    }
}

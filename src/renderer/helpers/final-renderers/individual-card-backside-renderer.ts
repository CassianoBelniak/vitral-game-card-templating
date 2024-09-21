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
    const canvas = document.createElement('canvas')
    canvas.width = cardSizes.width + marginX * 2
    canvas.height = cardSizes.height + marginY * 2
    return canvas
}

async function render(pipeline: ExportPipeline, card: Card, templates: string[]) {
    const canvas = getCanvas(pipeline)
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const context = canvas.getContext('2d')
    const cardRenderer = new CardRenderer(context!)
    cardRenderer.shift(marginX, marginY)
    await cardRenderer.applyCard(card, templates)
    return canvas
}

export default async function* individualBacksideFiles(
    pipeline: ExportPipeline,
    cards: Card[],
): AsyncGenerator<HTMLCanvasElement, void, unknown> {
    for (const card of cards) {
        await delay(200)
        const back = await render(pipeline, card, card.backsideTemplates)
        yield back
    }
}

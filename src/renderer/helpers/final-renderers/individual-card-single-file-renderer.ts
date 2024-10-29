import { projectConfigStore } from '../../stores/project-config-store.js'
import { Card } from '../../typings/card.js'
import { ExportPipeline } from '../../typings/export.js'
import { ExportedPage } from '../../typings/page.js'
import convertToPixels from '../convert-to-pixels.js'
import delay from '../delay.js'
import getCardCanvas from '../get-card-canvas.js'
import getCardSize from '../get-card-size.js'

function getCanvas(pipeline: ExportPipeline) {
    const cardSizes = getCardSize()
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const bleedingX = convertToPixels(pipeline.bleedingX, projectConfigStore.ppi)
    const bleedingY = convertToPixels(pipeline.bleedingY, projectConfigStore.ppi)
    const cardSpacing = convertToPixels(pipeline.cardSidesSpacing, projectConfigStore.ppi)
    const canvas = document.createElement('canvas')
    canvas.width = cardSizes.width * 2 + marginX * 2 + cardSpacing + bleedingX * 4
    canvas.height = cardSizes.height + marginY * 2 + bleedingY * 2
    const context = canvas.getContext('2d')
    context!.fillStyle = pipeline.backgroundColor
    context?.fillRect(0, 0, canvas.width, canvas.height)
    return canvas
}

async function render(pipeline: ExportPipeline, card: Card) {
    const cardSizes = getCardSize()
    const canvas = getCanvas(pipeline)
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const bleedingX = convertToPixels(pipeline.bleedingX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const cardSpacing = convertToPixels(pipeline.cardSidesSpacing, projectConfigStore.ppi)
    const context = canvas.getContext('2d')
    const frontCanvas = await getCardCanvas({
        card,
        pipeline,
        templateNames: card.frontsideTemplates,
    })
    const backCanvas = await getCardCanvas({ card, pipeline, templateNames: card.backsideTemplates })
    context?.drawImage(frontCanvas, marginX, marginY)
    context?.drawImage(backCanvas, marginX + cardSizes.width + cardSpacing + bleedingX * 2, marginY)
    return canvas
}

export default async function* individualCardSingleFile(
    pipeline: ExportPipeline,
    cards: Card[],
): AsyncGenerator<ExportedPage, void, void> {
    let index = 0
    for (const card of cards) {
        await delay(200)
        index += 1
        const front = await render(pipeline, card)
        yield { canvas: front, cardName: card.name, variables: card.variables, index }
    }
}

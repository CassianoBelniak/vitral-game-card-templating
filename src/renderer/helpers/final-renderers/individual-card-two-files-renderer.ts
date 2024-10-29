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
    const canvas = document.createElement('canvas')
    canvas.width = cardSizes.width + marginX * 2 + bleedingX * 2
    canvas.height = cardSizes.height + marginY * 2 + bleedingY * 2
    const context = canvas.getContext('2d')
    context!.fillStyle = pipeline.backgroundColor
    context?.fillRect(0, 0, canvas.width, canvas.height)
    return canvas
}

async function render(pipeline: ExportPipeline, card: Card, templates: string[]) {
    const canvas = getCanvas(pipeline)
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const context = canvas.getContext('2d')
    const cardCanvas = await getCardCanvas({
        card,
        pipeline,
        templateNames: templates,
    })
    context?.drawImage(cardCanvas, marginX, marginY)
    return canvas
}

export default async function* individualCardTwoFiles(
    pipeline: ExportPipeline,
    cards: Card[],
): AsyncGenerator<ExportedPage, void, unknown> {
    let index = 0
    for (const card of cards) {
        await delay(200)
        index += 1
        const front = await render(pipeline, card, card.frontsideTemplates)
        const back = await render(pipeline, card, card.backsideTemplates)
        yield { canvas: front, side: 'front', cardName: card.name, variables: card.variables, index }
        yield { canvas: back, side: 'back', cardName: card.name, variables: card.variables, index }
    }
}

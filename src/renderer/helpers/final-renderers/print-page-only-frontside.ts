import CardRenderer from '../../classes/card-renderer.js'
import { projectConfigStore } from '../../stores/project-config-store.js'
import { Card } from '../../typings/card.js'
import { ExportPipeline } from '../../typings/export.js'
import convertToPixels from '../convert-to-pixels.js'
import delay from '../delay.js'

function getCanvas(pipeline: ExportPipeline) {
    const paperWidth = convertToPixels(pipeline.paperWidth, projectConfigStore.ppi)
    const paperHeight = convertToPixels(pipeline.paperHeight, projectConfigStore.ppi)
    const canvas = document.createElement('canvas')
    canvas.width = paperWidth
    canvas.height = paperHeight
    return canvas
}

function getAvailableSpace(pipeline: ExportPipeline) {
    const paperWidth = convertToPixels(pipeline.paperWidth, projectConfigStore.ppi)
    const paperHeight = convertToPixels(pipeline.paperHeight, projectConfigStore.ppi)
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    return {
        x: paperWidth - marginX * 2,
        y: paperHeight - marginY * 2,
    }
}

function getCardRealState(pipeline: ExportPipeline) {
    const cardSizes = projectConfigStore.getParsedSizes()
    const bleedingX = convertToPixels(pipeline.bleedingX, projectConfigStore.ppi)
    const bleedingY = convertToPixels(pipeline.bleedingY, projectConfigStore.ppi)
    return {
        x: cardSizes.width + bleedingX * 2,
        y: cardSizes.height + bleedingY * 2,
    }
}

export default async function* printPageOnlyFrontside(
    pipeline: ExportPipeline,
    cards: Card[],
): AsyncGenerator<HTMLCanvasElement, void, unknown> {
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const frontsideOffsetX = convertToPixels(pipeline.frontsideOffsetX, projectConfigStore.ppi)
    const frontsideOffsetY = convertToPixels(pipeline.frontsideOffsetY, projectConfigStore.ppi)
    const cardRealState = getCardRealState(pipeline)
    let currentFrontsideCanvas = null
    let frontRenderer = null
    let remainingSpace = { x: 0, y: 0 }
    let line = 0

    for (const card of cards) {
        if (remainingSpace.x < cardRealState.x) {
            // I need this specific variable set before the y comparisson, that's why this condition is doubled
            remainingSpace.y -= cardRealState.y
        }

        if (remainingSpace.y < cardRealState.y) {
            await delay(200)
            line = 0
            if (currentFrontsideCanvas) {
                yield currentFrontsideCanvas
            }
            currentFrontsideCanvas = getCanvas(pipeline)
            remainingSpace = getAvailableSpace(pipeline)
            frontRenderer = new CardRenderer(currentFrontsideCanvas.getContext('2d')!)
            frontRenderer.shift(marginX + frontsideOffsetX, marginY + frontsideOffsetY)
        } else if (remainingSpace.x < cardRealState.x) {
            line += 1
            remainingSpace.x = getAvailableSpace(pipeline).x
            frontRenderer?.resetTransform()
            frontRenderer?.shift(marginX + frontsideOffsetX, marginY + frontsideOffsetY + cardRealState.y * line)
        }

        await frontRenderer?.applyCard(card, card.frontsideTemplates)

        frontRenderer?.shift(cardRealState.x, 0)

        remainingSpace.x -= cardRealState.x
    }

    yield currentFrontsideCanvas
}

import { projectConfigStore } from '../../stores/project-config-store.js'
import { Card } from '../../typings/card.js'
import { ExportPipeline } from '../../typings/export.js'
import { ExportedPage } from '../../typings/page.js'
import convertToPixels from '../convert-to-pixels.js'
import delay from '../delay.js'
import getCardCanvas from '../get-card-canvas.js'
import getCardSize from '../get-card-size.js'

function getCanvas(pipeline: ExportPipeline) {
    const paperWidth = convertToPixels(pipeline.paperWidth, projectConfigStore.ppi)
    const paperHeight = convertToPixels(pipeline.paperHeight, projectConfigStore.ppi)
    const canvas = document.createElement('canvas')
    canvas.width = paperWidth
    canvas.height = paperHeight
    const context = canvas.getContext('2d')
    context!.fillStyle = pipeline.backgroundColor
    context?.fillRect(0, 0, canvas.width, canvas.height)
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
    const cardSizes = getCardSize()
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
): AsyncGenerator<ExportedPage, void, unknown> {
    const marginX = convertToPixels(pipeline.marginX, projectConfigStore.ppi)
    const marginY = convertToPixels(pipeline.marginY, projectConfigStore.ppi)
    const frontsideOffsetX = convertToPixels(pipeline.frontsideOffsetX, projectConfigStore.ppi)
    const frontsideOffsetY = convertToPixels(pipeline.frontsideOffsetY, projectConfigStore.ppi)
    const cardRealState = getCardRealState(pipeline)
    let currentFrontsideCanvas = null
    let frontRenderer = null
    let remainingSpace = { x: 0, y: 0 }
    let line = 0
    let index = 0

    for (const card of cards) {
        if (remainingSpace.x < cardRealState.x) {
            // I need this specific variable set before the y comparisson, that's why this condition is doubled
            remainingSpace.y -= cardRealState.y
        }

        if (remainingSpace.y < cardRealState.y) {
            await delay(200)
            line = 0
            if (currentFrontsideCanvas) {
                index += 1
                yield { canvas: currentFrontsideCanvas, side: 'front', index }
            }
            currentFrontsideCanvas = getCanvas(pipeline)
            remainingSpace = getAvailableSpace(pipeline)
            frontRenderer = currentFrontsideCanvas.getContext('2d')
            frontRenderer?.translate(marginX + frontsideOffsetX, marginY + frontsideOffsetY)
        } else if (remainingSpace.x < cardRealState.x) {
            line += 1
            remainingSpace.x = getAvailableSpace(pipeline).x
            frontRenderer?.resetTransform()
            frontRenderer?.translate(marginX + frontsideOffsetX, marginY + frontsideOffsetY + cardRealState.y * line)
        }

        const frontCanvas = await getCardCanvas({
            card,
            pipeline,
            templateNames: card.frontsideTemplates,
        })
        frontRenderer?.drawImage(frontCanvas, 0, 0)
        frontRenderer?.translate(cardRealState.x, 0)

        remainingSpace.x -= cardRealState.x
    }

    if (currentFrontsideCanvas) {
        index += 1
        yield { canvas: currentFrontsideCanvas, side: 'front', index }
    }
}

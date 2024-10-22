import CardRenderer from '../classes/card-renderer.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { Card } from '../typings/card.js'
import { ExportPipeline } from '../typings/export.js'
import convertToPixels from './convert-to-pixels.js'
import getCardSize from './get-card-size.js'

export default async function getCardCanvas({
    card,
    pipeline,
    templateNames,
}: {
    card: Card
    pipeline: ExportPipeline
    templateNames: string[]
}) {
    const cardSizes = getCardSize()
    const bleedingX = convertToPixels(pipeline.bleedingX, projectConfigStore.ppi)
    const bleedingY = convertToPixels(pipeline.bleedingY, projectConfigStore.ppi)
    const canvas = document.createElement('canvas')
    canvas.width = cardSizes.width + bleedingX * 2
    canvas.height = cardSizes.height + bleedingY * 2
    const context = canvas.getContext('2d')
    const renderer = new CardRenderer(context!)
    renderer.shift(bleedingX, bleedingY)
    await renderer.applyCard(card, templateNames)
    renderer.shift(-bleedingX, -bleedingY)
    if (pipeline.cropCardContent) {
        context?.clearRect(0, 0, bleedingX, cardSizes.height + bleedingY)
        context?.clearRect(0, 0, cardSizes.width + bleedingX * 2, bleedingY)
        context?.clearRect(0, cardSizes.height + bleedingY, cardSizes.width + bleedingX, bleedingY)
        context?.clearRect(cardSizes.width + bleedingX, 0, bleedingX, cardSizes.height + bleedingY)
    }
    return canvas
}

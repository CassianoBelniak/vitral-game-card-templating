import CardRenderer from '../classes/card-renderer.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { Card } from '../typings/card.js'
import { ExportPipeline } from '../typings/export.js'
import convertToPixels from './convert-to-pixels.js'

export default async function getCardCanvas({
    card,
    pipeline,
    templateNames,
}: {
    card: Card
    pipeline: ExportPipeline
    templateNames: string[]
}) {
    const cardSizes = projectConfigStore.getParsedSizes()
    const bleedingX = convertToPixels(pipeline.bleedingX, projectConfigStore.ppi)
    const bleedingY = convertToPixels(pipeline.bleedingY, projectConfigStore.ppi)
    const canvas = document.createElement('canvas')
    canvas.width = cardSizes.width + bleedingX * 2
    canvas.height = cardSizes.height + bleedingY * 2
    const renderer = new CardRenderer(canvas.getContext('2d')!)
    renderer.shift(bleedingX, bleedingY)
    await renderer.applyCard(card, templateNames)
    return canvas
}

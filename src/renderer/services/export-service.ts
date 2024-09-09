import exportJpeg from '../helpers/exporters/export-jpeg.js'
import exportPng from '../helpers/exporters/export-png.js'
import individualBacksideFiles from '../helpers/final-renderers/individual-card-backside-renderer.js'
import individualCardFrontside from '../helpers/final-renderers/individual-card-frontside-renderer.js'
import individualCardSingleFile from '../helpers/final-renderers/individual-card-single-file-renderer.js'
import individualCardTwoFiles from '../helpers/final-renderers/individual-card-two-files-renderer.js'
import printPageOnlyBackside from '../helpers/final-renderers/print-page-only-backside.js'
import printPageOnlyFrontside from '../helpers/final-renderers/print-page-only-frontside.js'
import printPageSamePageForSides from '../helpers/final-renderers/print-page-same-page-for-sides.js'
import printPageSeparatedPageForSides from '../helpers/final-renderers/print-page-separated-page-for-sides.js'
import { Card } from '../typings/card.js'
import { ExportPipeline } from '../typings/export.js'

interface RendererTypes {
    [key: string]: (pipeline: ExportPipeline, cards: Card[]) => Promise<HTMLCanvasElement[]>
}

interface ExportersTypes {
    [key: string]: (pipeline: ExportPipeline, pages: HTMLCanvasElement[]) => Promise<void>
}

const RENDERERS: RendererTypes = {
    'individual-card-single-file': individualCardSingleFile,
    'individual-card-two-files': individualCardTwoFiles,
    'individual-card-only-frontside': individualCardFrontside,
    'individual-card-only-backside': individualBacksideFiles,
    'print-page-separated-pages': printPageSeparatedPageForSides,
    'print-page-same-pages': printPageSamePageForSides,
    'print-page-only-frontside': printPageOnlyFrontside,
    'print-page-only-backside': printPageOnlyBackside,
}

const EXPORTERS: ExportersTypes = {
    png: exportPng,
    jpeg: exportJpeg,
}

export class ExportService {
    static async renderCanvas(pipeline: ExportPipeline, cards: Card[]) {
        const renderer = RENDERERS[pipeline.exportType]
        return renderer(pipeline, cards)
    }

    static async exportPages(pipeline: ExportPipeline, cards: Card[]) {
        const pages = await ExportService.renderCanvas(pipeline, cards)
        const exporter = EXPORTERS[pipeline.extension]
        await exporter(pipeline, pages)
    }
}

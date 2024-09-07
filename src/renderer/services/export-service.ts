import individualCardSingleFile from '../helpers/final-renderers/individual-card-single-file-renderer.js'
import individualCardTwoFiles from '../helpers/final-renderers/individual-card-two-files-renderer.js'
import { Card } from '../typings/card.js'
import { ExportPipeline } from '../typings/export.js'

interface RendererTypes {
    [key: string]: ((pipeline: ExportPipeline, cards: Card[]) => Promise<HTMLCanvasElement[]>) | null
}

const RENDERERS: RendererTypes = {
    'individual-card-single-file': individualCardSingleFile,
    'individual-card-two-files': individualCardTwoFiles,
    'individual-card-ony-frontside': null,
    'individual-card-ony-backside': null,
    'print-page-separated-pages': null,
    'print-page-same-pages': null,
    'print-page-only-frontside': null,
    'print-page-only-backside': null,
}
  

export class ExportService {
    static async renderCanvas(pipeline: ExportPipeline, cards: Card[]) {
        const renderer = RENDERERS[pipeline.exportType]
        if (renderer !== null) {
            return renderer(pipeline, cards)
        }
        return []
    }
}

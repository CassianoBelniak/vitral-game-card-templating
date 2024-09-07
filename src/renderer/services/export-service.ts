import individualCardSingleFile from '../helpers/final-renderers/individual-card-single-file-renderer.js'
import { Card } from '../typings/card.js'
import { ExportPipeline } from '../typings/export.js'

export class ExportService {
    static async renderCanvas(pipeline: ExportPipeline, cards: Card[]) {
        return individualCardSingleFile(pipeline, cards)
    }
}

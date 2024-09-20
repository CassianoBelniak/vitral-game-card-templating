import { ExportPipeline } from '../typings/export.js'

export default function duplicatePipeline(
    pipeline: ExportPipeline | undefined,
): ExportPipeline {
    if (!pipeline) {
        return {
            name: '',
            destination: '',
            extension: '',
            exportType: '',
            bleedingX: '',
            bleedingY: '',
            marginX: '',
            marginY: '',
            backsideOffsetX: '',
            backsideOffsetY: '',
            frontsideOffsetX: '',
            frontsideOffsetY: '',
            parseCMYK: false,
            paperWidth: '',
            paperHeight: '',
            cardSidesSpacing: '',
            cards: {},
        }
    }
    const newPipeline = JSON.parse(JSON.stringify(pipeline))
    return newPipeline
}

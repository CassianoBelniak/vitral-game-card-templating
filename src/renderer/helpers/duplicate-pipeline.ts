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
            paperWidth: '210mm',
            paperHeight: '297mm',
            cardSidesSpacing: '',
            cards: {},
            cropCardContent: false,
            eraseFolderContents: false,
            backgroundColor: '#ffffff00',
            exportNameTemplate: 'export-{index, 5, 0}.{ext}',
        }
    }
    const newPipeline = JSON.parse(JSON.stringify(pipeline))
    return newPipeline
}

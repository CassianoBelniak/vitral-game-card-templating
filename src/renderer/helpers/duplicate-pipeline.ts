import { ExportPipeline } from '../typings/export.js'

export default function duplicatePipeline(
    pipeline: ExportPipeline | undefined,
): ExportPipeline {
    if (!pipeline) {
        return {
            name: '',
            destination: '',
            extension: '',
        }
    }
    const newPipeline = JSON.parse(JSON.stringify(pipeline))
    return newPipeline
}

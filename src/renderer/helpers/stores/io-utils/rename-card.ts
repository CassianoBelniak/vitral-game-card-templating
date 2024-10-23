import { exportPipelinesStore } from '../../../stores/export-pipeline-store.js'

export default function renameCard(from: string, to: string) {
    for (const [pipelineName, pipeline] of Object.entries(exportPipelinesStore.exportPipelines)) {
        pipeline.cards[to] = pipeline.cards[from]
        delete pipeline.cards[from]
        exportPipelinesStore.setExportPipeline(pipelineName, pipeline)
    }
}

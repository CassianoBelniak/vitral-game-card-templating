import { exportPipelinesStore } from '../../../stores/export-pipeline-store.js'

export default function removeCard(cardId: string) {
    for (const [pipelineName, pipeline] of Object.entries(exportPipelinesStore.exportPipelines)) {
        delete pipeline.cards[cardId]
        exportPipelinesStore.setExportPipeline(pipelineName, pipeline)
    }
}

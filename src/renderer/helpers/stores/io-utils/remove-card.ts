import { exportPipelinesStore } from '../../../stores/export-pipeline-store.js'

export default function removeCard(cardName: string) {
    for (const [pipelineName, pipeline] of Object.entries(exportPipelinesStore.exportPipelines)) {
        delete pipeline.cards[cardName]
        exportPipelinesStore.setExportPipeline(pipelineName, pipeline)
    }
}

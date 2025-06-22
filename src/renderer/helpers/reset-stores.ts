import { cardStore } from '../stores/cards-store.js'
import { exportPipelinesStore } from '../stores/export-pipeline-store.js'
import { fontsStore } from '../stores/fonts-store.js'
import { imagesStore } from '../stores/images-store.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { templatesStore } from '../stores/templates-store.js'

export default function resetStores() {
    projectConfigStore.workingDirectory = ''
    cardStore.cards = {}
    templatesStore.templates = {}
    fontsStore.fonts = {}
    exportPipelinesStore.exportPipelines = {}
    imagesStore.images = {}
}

import { projectConfigStore } from '../stores/project-config-store.js'
import convertToPixels from './convert-to-pixels.js'

export default function getCardSize() {
    return {
        width: convertToPixels(projectConfigStore.width, projectConfigStore.ppi),
        height: convertToPixels(projectConfigStore.height, projectConfigStore.ppi),
    }
}

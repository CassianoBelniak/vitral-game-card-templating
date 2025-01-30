import { projectConfigStore } from '../stores/project-config-store.js'

export default function getAbsoluteFolder(relativeFolder: string) {
    return relativeFolder.replace(/^./m, projectConfigStore.workingDirectory)
}

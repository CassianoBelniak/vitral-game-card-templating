import path from 'path'
import { projectConfigStore } from '../stores/project-config-store.js'

export default function getAbsoluteFolder(relativeFolder: string) {
    return path.resolve(projectConfigStore.workingDirectory, relativeFolder)
}


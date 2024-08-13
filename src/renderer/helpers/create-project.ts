import path from 'path'
import { projectConfigStore } from '../stores/project-config-store.js'

const DEFAULT_PROJECT_CONFIG = {}

export async function createProject() {
    const workingDirectory = projectConfigStore.workingDirectory
    const projectName = projectConfigStore.projectName
    await window.electronAPI.saveFile(
        path.join(workingDirectory, projectName),
        Buffer.from(JSON.stringify(DEFAULT_PROJECT_CONFIG)),
    )
}

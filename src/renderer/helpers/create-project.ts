import { fileStore } from '../stores/file-store'
import path from 'path'

const DEFAULT_PROJECT_CONFIG = {}

export async function createProject() {
    const workingDirectory = fileStore.workingDirectory
    const projectName = fileStore.projectName
    await window.electronAPI.saveFile(
        path.join(workingDirectory, projectName),
        Buffer.from(JSON.stringify(DEFAULT_PROJECT_CONFIG)),
    )
}

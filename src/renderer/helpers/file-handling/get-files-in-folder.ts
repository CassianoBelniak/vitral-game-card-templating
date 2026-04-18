import { projectConfigStore } from '../../stores/project-config-store.js'

export default async function getFilesInFolder(folder: string) {
    const files = await recurse(folder)
    return files.map((file) => file.replace(folder + '/', ''))
}

async function recurse(folder: string) {
    const foundFiles: string[] = []
    const files = await window.electronAPI.listFiles(`${projectConfigStore.workingDirectory}/${folder}`)
    for (const file of files) {
        if (await window.electronAPI.isDirectory(`${projectConfigStore.workingDirectory}/${folder}/${file}`)) {
            const childFiles = await recurse(`${folder}/${file}`)
            foundFiles.push(...childFiles)
        } else {
            foundFiles.push(`${folder}/${file}`)
        }
    }
    return foundFiles
}


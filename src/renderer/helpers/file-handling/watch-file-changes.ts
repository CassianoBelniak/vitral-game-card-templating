export async function watchFileChanges(filePath: string) {
    await window.electronAPI.watchFolder(filePath)
}

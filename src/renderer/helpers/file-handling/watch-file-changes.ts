export function watchFileChanges(filePath: string) {
    window.electronAPI.watchFolder(filePath)
}

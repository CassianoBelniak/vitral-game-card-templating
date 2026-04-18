import path from 'path'

export async function assertProjectStructure(projectPath: string) {
    await window.electronAPI.assertPath(path.join(projectPath, 'assets', 'images'))
    await window.electronAPI.assertPath(path.join(projectPath, 'assets', 'fonts'))
    await window.electronAPI.assertPath(path.join(projectPath, 'assets', 'cards'))
    await window.electronAPI.assertPath(path.join(projectPath, 'assets', 'templates'))
}

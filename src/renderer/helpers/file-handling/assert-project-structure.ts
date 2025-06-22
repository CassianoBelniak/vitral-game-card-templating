import path from 'path'

export function assertProjectStructure(projectPath: string) {
    window.electronAPI.assertPath(path.join(projectPath, 'assets', 'images'))
    window.electronAPI.assertPath(path.join(projectPath, 'assets', 'fonts'))
    window.electronAPI.assertPath(path.join(projectPath, 'assets', 'cards'))
    window.electronAPI.assertPath(path.join(projectPath, 'assets', 'templates'))
}

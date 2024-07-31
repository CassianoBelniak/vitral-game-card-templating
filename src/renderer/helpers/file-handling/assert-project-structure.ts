import path from 'path'

export function assertProjectStructure(projectPath: string) {
    window.electronAPI.assertPath(path.join(projectPath, 'resources', 'images'))
    window.electronAPI.assertPath(path.join(projectPath, 'resources', 'fonts'))
}

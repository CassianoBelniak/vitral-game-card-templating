export function addRecentProject(projectPath: string) {
    const recentProjects = window.electronAPI.getConfig(
        'recentProjects',
        [],
    ) as Array<string>
    recentProjects
        .filter((project) => project !== projectPath)
        .unshift(projectPath)
    window.electronAPI.setConfig('recentProjects', recentProjects)
}

export function getRecentProjects() {
    return window.electronAPI.getConfig('recentProjects', []) as Array<string>
}

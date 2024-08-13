export async function addRecentProject(projectPath: string) {
    if (!projectPath) {
        return
    }
    const recentProjects = (await window.electronAPI.getConfig(
        'recentProjects',
        [],
    )) as Array<string>
    const updatedList = recentProjects.filter(
        (project) => project !== projectPath,
    )
    updatedList.unshift(projectPath)
    window.electronAPI.setConfig('recentProjects', updatedList)
}

export async function getRecentProjects() {
    return (await window.electronAPI.getConfig(
        'recentProjects',
        [],
    )) as Array<string>
}

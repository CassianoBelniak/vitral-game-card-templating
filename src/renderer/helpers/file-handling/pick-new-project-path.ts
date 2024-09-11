export async function pickNewProjectPath() {
    const pickerOpts = {
        id: 'guaxi-project',
        title: 'Create project',
        defaultPath: 'New Project',
        filters: [
            {
                name: 'Project',
                extensions: ['guaxi'],
            },
        ],
        properties: ['openFile', 'promptToCreate', 'createDirectory '],
    }
    //TODO: fix this warning
    const path = await window.electronAPI.saveDialog(pickerOpts)
    return path.replace(/\\/g, '/')
}

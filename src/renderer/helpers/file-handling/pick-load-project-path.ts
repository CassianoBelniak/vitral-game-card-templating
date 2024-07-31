export async function pickLoadProjectPath() {
    const pickerOpts = {
        id: 'martelo-project',
        title: 'Open project',
        filters: [
            {
                name: 'Project',
                extensions: ['martelo'],
            },
        ],
        properties: ['openFile'],
    }
    //TODO: fix this warning
    const files = await window.electronAPI.openDialog(pickerOpts)
    return files[0].replace(/\\/g, '/')
}

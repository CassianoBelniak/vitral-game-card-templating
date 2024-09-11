export async function pickLoadProjectPath() {
    const pickerOpts = {
        id: 'guaxi-project',
        title: 'Open project',
        filters: [
            {
                name: 'Project',
                extensions: ['guaxi'],
            },
        ],
        properties: ['openFile'],
    }
    //TODO: fix this warning
    const files = await window.electronAPI.openDialog(pickerOpts)
    return files[0].replace(/\\/g, '/')
}

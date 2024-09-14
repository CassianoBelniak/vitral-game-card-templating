export async function pickLoadProjectPath() {
    const pickerOpts = {
        id: 'vitral-project',
        title: 'Open project',
        filters: [
            {
                name: 'Project',
                extensions: ['vitral'],
            },
        ],
        properties: ['openFile'],
    }
    //TODO: fix this warning
    const files = await window.electronAPI.openDialog(pickerOpts)
    return files[0].replace(/\\/g, '/')
}

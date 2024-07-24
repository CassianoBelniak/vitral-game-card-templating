import { dialog } from 'electron'

//https://www.electronjs.org/docs/latest/api/dialog

export async function openDialog(event, opts) {
    const result = await dialog.showOpenDialog(opts)
    return result.filePaths
}

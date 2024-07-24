import { dialog } from 'electron'

//https://www.electronjs.org/docs/latest/api/dialog

export async function saveDialog(event, opts) {
    const result = await dialog.showSaveDialog(opts)
    return result.filePath
}
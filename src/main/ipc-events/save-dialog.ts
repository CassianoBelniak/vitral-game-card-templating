import { dialog } from 'electron'

//https://www.electronjs.org/docs/latest/api/dialog

export async function saveDialog(event: Electron.IpcMainInvokeEvent, opts: Electron.BrowserWindow) {
    const result = await dialog.showSaveDialog(opts)
    return result.filePath
}

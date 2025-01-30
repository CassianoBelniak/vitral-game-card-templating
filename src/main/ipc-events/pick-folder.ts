import { dialog } from 'electron'

//https://www.electronjs.org/docs/latest/api/dialog

export async function pickFolder(event: Electron.IpcMainInvokeEvent, opts: Electron.BrowserWindow) {
    const result = await dialog.showOpenDialog(opts)
    return result.filePaths?.[0]
}

import 'electron'
import { shell } from 'electron'

export async function showFile(event: Electron.IpcMainInvokeEvent, filePath: string) {
    shell.showItemInFolder(filePath)
}

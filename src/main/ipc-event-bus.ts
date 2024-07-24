import { ipcMain } from 'electron'
import { message } from './ipc-events/message'
import { openDialog } from './ipc-events/open-dialog'
import { saveDialog } from './ipc-events/save-dialog'
import { saveFile } from './ipc-events/save-file'
import { loadFile } from './ipc-events/load-file'

export function registerEvents() {
    ipcMain.on('message', message)
    ipcMain.handle('open-dialog', openDialog)
    ipcMain.handle('save-dialog', saveDialog)
    ipcMain.handle('save-file', saveFile)
    ipcMain.handle('load-file', loadFile)
}

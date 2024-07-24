import { ipcMain } from 'electron'
import { message } from './ipc-events/message'
import { openDialog } from './ipc-events/open-dialog'
import { saveDialog } from './ipc-events/save-dialog'

export function registerEvents() {
    ipcMain.on('message', message)
    ipcMain.handle('open-dialog', openDialog)
    ipcMain.handle('save-dialog', saveDialog)
}

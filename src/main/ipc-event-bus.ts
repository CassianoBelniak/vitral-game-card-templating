import { ipcMain } from 'electron'
import { message } from './ipc-events/message.js'
import { openDialog } from './ipc-events/open-dialog.js'
import { saveDialog } from './ipc-events/save-dialog.js'
import { saveFile } from './ipc-events/save-file.js'
import { loadFile } from './ipc-events/load-file.js'
import { getConfig } from './ipc-events/get-config.js'
import { setConfig } from './ipc-events/set-config.js'

export function registerEvents() {
    ipcMain.on('message', message)
    ipcMain.handle('open-dialog', openDialog)
    ipcMain.handle('save-dialog', saveDialog)
    ipcMain.handle('save-file', saveFile)
    ipcMain.handle('load-file', loadFile)
    ipcMain.handle('get-config', getConfig)
    ipcMain.handle('set-config', setConfig)
}

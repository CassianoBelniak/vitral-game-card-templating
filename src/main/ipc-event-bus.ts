import { BrowserWindow, ipcMain } from 'electron'
import { message } from './ipc-events/message.js'
import { openDialog } from './ipc-events/open-dialog.js'
import { saveDialog } from './ipc-events/save-dialog.js'
import { saveFile } from './ipc-events/save-file.js'
import { loadFile } from './ipc-events/load-file.js'
import { getConfig } from './ipc-events/get-config.js'
import { setConfig } from './ipc-events/set-config.js'
import { assertPath } from './ipc-events/assert-path.js'
import { watchFolder } from './ipc-events/watch-folder.js'
import { deleteFile } from './ipc-events/delete-file.js'

export function registerEvents(mainWindow: BrowserWindow) {
    ipcMain.on('message', message)
    ipcMain.handle('open-dialog', openDialog)
    ipcMain.handle('save-dialog', saveDialog)
    ipcMain.handle('save-file', saveFile)
    ipcMain.handle('load-file', loadFile)
    ipcMain.handle('delete-file', deleteFile)
    ipcMain.handle('get-config', getConfig)
    ipcMain.handle('set-config', setConfig)
    ipcMain.handle('assert-path', assertPath)
    ipcMain.handle('watch-folder', (event, filePath) =>
        watchFolder(event, filePath, mainWindow),
    )
}

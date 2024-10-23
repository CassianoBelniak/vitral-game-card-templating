import 'electron'
import chokidar from 'chokidar'
import { BrowserWindow } from 'electron'

let currentWatcher: import('chokidar').FSWatcher | null = null

export async function watchFolder(
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
    mainWindow: BrowserWindow,
) {
    if (currentWatcher) {
        currentWatcher.close()
    }
    currentWatcher = chokidar.watch(filePath).on('all', (event, path) => {
        console.log(event, path)
        mainWindow.webContents.send('file-changed', {
            path: path.replace(/\\/g, '/'),
            event: event,
        })
    })
}

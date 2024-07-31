import { app, BrowserWindow, session } from 'electron'
import { join } from 'path'
import { registerEvents } from './ipc-event-bus.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    if (process.env.NODE_ENV === 'development') {
        const rendererPort = process.argv[2]
        mainWindow.loadURL(`http://localhost:${rendererPort}`)
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
    }

    registerEvents(mainWindow)
}

app.whenReady().then(() => {
    createWindow()

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ["script-src 'self'"],
            },
        })
    })

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})











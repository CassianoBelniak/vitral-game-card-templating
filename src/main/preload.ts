// Keep this as CommonJS since electron preload script does not understand ESM
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron')

function sendMessage(message: string) {
    ipcRenderer.send('message', message)
}

async function openDialog(opts: Electron.BrowserWindow): Promise<string[]> {
    return ipcRenderer.invoke('open-dialog', opts)
}

async function saveDialog(opts: Electron.BrowserWindow): Promise<string[]> {
    return ipcRenderer.invoke('save-dialog', opts)
}

async function saveFile(path: string, content: Buffer) {
    await ipcRenderer.invoke('save-file', path, content)
}

async function loadFile(path: string): Promise<Buffer> {
    return ipcRenderer.invoke('load-file', path)
}

async function setConfig(path: string, value: unknown) {
    await ipcRenderer.invoke('set-config', path, value)
}

async function getConfig(path: string, defaultValue: unknown) {
    return ipcRenderer.invoke('get-config', path, defaultValue)
}

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage,
    openDialog,
    saveDialog,
    saveFile,
    loadFile,
    setConfig,
    getConfig,
})





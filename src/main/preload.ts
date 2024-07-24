import { contextBridge, ipcRenderer } from 'electron'

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

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage,
    openDialog,
    saveDialog,
    saveFile,
    loadFile,
})



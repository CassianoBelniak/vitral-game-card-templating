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

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage,
    openDialog,
    saveDialog,
})


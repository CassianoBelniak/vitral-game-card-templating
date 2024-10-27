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

async function loadFile(path: string): Promise<string | null> {
    return ipcRenderer.invoke('load-file', path)
}

async function deleteFile(path: string) {
    await ipcRenderer.invoke('delete-file', path)
}

async function setConfig(path: string, value: unknown) {
    await ipcRenderer.invoke('set-config', path, value)
}

async function getConfig(path: string, defaultValue: unknown) {
    return ipcRenderer.invoke('get-config', path, defaultValue)
}

async function assertPath(filePath: string) {
    return ipcRenderer.invoke('assert-path', filePath)
}

async function showFile(filePath: string) {
    ipcRenderer.invoke('show-file', filePath)
}

async function watchFolder(filePath: string) {
    return ipcRenderer.invoke('watch-folder', filePath)
}

function registerFileChangedCallback(callback: (path: string, type: string) => void) {
    ipcRenderer.on('file-changed', (event, message: { path: string; event: string }) => {
        callback(message.path, message.event)
    })
}

function getProjectPath() {
    const projectpath = process.argv.filter((p) => p.indexOf('--projectpath=') >= 0)[0]
    return projectpath?.split('=')[1] || ''
}

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage,
    openDialog,
    saveDialog,
    saveFile,
    loadFile,
    setConfig,
    getConfig,
    assertPath,
    watchFolder,
    showFile,
    deleteFile,
    registerFileChangedCallback,
    projectPath: getProjectPath(),
})
























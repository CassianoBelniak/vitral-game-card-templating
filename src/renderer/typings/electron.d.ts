import 'electron'
/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
    sendMessage: (message: string) => void
    openDialog: (opts: Electron.BrowserWindow) => Promise<string[]>
    saveDialog: (opts: Electron.BrowserWindow) => Promise<string>
}

declare global {
    interface Window {
        electronAPI: ElectronApi
    }
}


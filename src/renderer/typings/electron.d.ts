import 'electron'
/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
    sendMessage: (message: string) => void
    openDialog: (opts: Electron.BrowserWindow) => Promise<string[]>
    saveDialog: (opts: Electron.BrowserWindow) => Promise<string>
    pickFolder: (opts: Electron.BrowserWindow) => Promise<string>
    saveFile: (path: string, content: Buffer) => Promise<void>
    loadFile: (path: string) => Promise<string | null>
    setConfig: (path: string, value: unknown) => Promise<void>
    getConfig: (path: string, defaultValue: unknown) => Promise<unknown>
    assertPath: (filePath: string) => Promise<void>
    showFile: (filePath: string) => Promise<void>
    watchFolder: (filePath: string) => Promise<void>
    deleteFile: (filePath: string) => Promise<void>
    registerFileChangedCallback: (callback: (path: string, event: string) => void) => void
    projectPath?: string
}

declare global {
    interface Window {
        electronAPI: ElectronApi
    }
}















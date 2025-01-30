import 'electron'
import fs from 'fs/promises'

export async function listFiles(event: Electron.IpcMainInvokeEvent, filePath: string): Promise<string[]> {
    return fs.readdir(filePath)
}

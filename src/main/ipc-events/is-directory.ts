import 'electron'
import fs from 'fs/promises'

export async function isDirectory(event: Electron.IpcMainInvokeEvent, filePath: string): Promise<boolean> {
    return (await fs.lstat(filePath)).isDirectory()
}


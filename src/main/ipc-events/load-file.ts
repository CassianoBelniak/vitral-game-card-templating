import 'electron'
import fs from 'fs/promises'

export async function loadFile(
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
): Promise<Buffer> {
    return fs.readFile(filePath)
}

import 'electron'
import fs from 'fs/promises'
import path from 'path'

export async function saveFile(event: Electron.IpcMainInvokeEvent, filePath: string, buffer: Buffer) {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, buffer, 'utf-8')
}

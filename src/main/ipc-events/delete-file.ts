import 'electron'
import fs from 'fs/promises'

export async function deleteFile(event: Electron.IpcMainInvokeEvent, filePath: string) {
    console.log('deleting', filePath)
    await fs.rm(filePath, { recursive: true, force: true })
}

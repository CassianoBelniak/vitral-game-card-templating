import 'electron'
import fs from 'fs/promises'

export async function deleteFile(
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
) {
    //TODO: Sandbox filePath to prevent malicious file write
    console.log('deleting', filePath)
    await fs.rm(filePath, { recursive: true, force: true })
}

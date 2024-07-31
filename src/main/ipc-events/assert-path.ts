import 'electron'
import fs from 'fs/promises'

export async function assertPath(
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
) {
    //TODO: Sandbox filePath to prevent malicious file write
    await fs.mkdir(filePath, { recursive: true })
}

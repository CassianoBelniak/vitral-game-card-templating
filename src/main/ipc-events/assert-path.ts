import 'electron'
import fs from 'fs/promises'

export async function assertPath(
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
) {
    await fs.mkdir(filePath, { recursive: true })
}

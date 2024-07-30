import 'electron'
import fs from 'fs/promises'

async function exists(f: string): Promise<boolean> {
    try {
        await fs.stat(f)
        return true
    } catch {
        return false
    }
}

export async function loadFile(
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
): Promise<string | null> {
    //TODO: Sandbox filePath to prevent malicious file write
    if (await exists(filePath)) {
        const data = await fs.readFile(filePath)
        //TODO: Parsing data to base64 and then back to string is a overhead, but I don't see any other way to do it
        return data.toString('base64')
    }
    return null
}

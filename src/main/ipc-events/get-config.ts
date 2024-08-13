// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
//TODO: remove these comments
import { configStore } from '../configs/config-store.js'

export function getConfig(
    event: Electron.IpcMainInvokeEvent,
    path: string,
    defaultValue: unknown,
) {
    return configStore.get(path, defaultValue)
}

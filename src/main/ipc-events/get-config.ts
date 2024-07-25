// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { configStore } from '../configs/config-store.js'

export function getConfig(
    event: Electron.IpcMainInvokeEvent,
    path: string,
    defaultValue: unknown,
) {
    configStore.get(path, defaultValue)
}

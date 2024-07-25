// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { configStore } from '../configs/config-store.js'

export function setConfig(
    event: Electron.IpcMainInvokeEvent,
    path: string,
    value: unknown,
) {
    configStore.set(path, value)
}

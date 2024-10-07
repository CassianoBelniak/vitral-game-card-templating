import { fileTypeFromBuffer } from 'file-type'

export async function getMimeTypeFromBase64(base64String: string) {
    const base64string_buffer = Buffer.from(base64String, 'base64')
    const result = await fileTypeFromBuffer(base64string_buffer)
    if (result?.ext === 'xml') {
        return 'image/svg+xml'
    }
    return result?.mime ?? 'image/svg+xml'
}

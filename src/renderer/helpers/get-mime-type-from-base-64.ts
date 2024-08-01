export function getMimeTypeFromBase64(base64String: string): string {
    if (base64String.startsWith('iVBORw0KGgo')) {
        return 'image/png'
    }
    return 'image/svg+xml'
}

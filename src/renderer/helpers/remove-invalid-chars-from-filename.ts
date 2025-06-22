export default function removeInvalidCharsFromFilename(filename: string) {
    return filename.replace(/[\\?%*:|"<>]/g, '')
}

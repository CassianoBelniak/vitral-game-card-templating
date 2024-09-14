export function registerFont(family: string, data: string) {
    const newFont = new FontFace(family, `url(data:font/ttf;base64,${data})`)
    newFont.load().then((font) => {
        document.fonts.add(font)
    })
}

export function unregisterFont(family: string) {
    for (const fontFace of document.fonts) {
        if (fontFace.family === family) {
            document.fonts.delete(fontFace)
        }
    }
}

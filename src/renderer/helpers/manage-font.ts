export function registerFont(family: string, data: string) {
    console.log(family)
    const newFont = new FontFace(family, `url(data:font/ttf;base64,${data})`)
    newFont.load().then((font) => {
        document.fonts.add(font)
    })

    // const newStyle = document.createElement('style')
    // newStyle.appendChild(
    //     document.createTextNode(`
    // @font-face {
    //     font-family: '${family}';
    //     src: url(data:font/ttf;base64,${data}) format('truetype');
    // }
    // `),
    // )

    // document.head.appendChild(newStyle)
}

export function unregisterFont(family: string) {
    for (const fontFace of document.fonts) {
        if ((fontFace.family = family)) {
            document.fonts.delete(fontFace)
        }
    }
}

export function registerFont(family: string, data: string) {
    const newStyle = document.createElement('style')
    newStyle.appendChild(
        document.createTextNode(`
    @font-face {
        font-family: '${family}';
        src: url(data:font/ttf;base64,${data}) format('truetype');
    }
    `),
    )

    document.head.appendChild(newStyle)
}

export function unregisterFont(family: string) {
    const style = document.querySelector(`style[data-font="${family}"]`)
    if (style) {
        style.remove()
    }
}

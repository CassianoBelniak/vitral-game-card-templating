import { ImageValues } from '../../classes/component-image.js'

export default function drawImageTile(image: HTMLCanvasElement, target: HTMLCanvasElement, values: ImageValues) {
    const canvasContext = target.getContext('2d')
    const imageWidth = image.width * values.scaleX
    const imageHeight = image.height * values.scaleY
    let cursorX = values.tillingOffsetX - imageWidth
    while (cursorX < target.width) {
        let cursorY = values.tillingOffsetY - imageHeight
        while (cursorY < target.height) {
            canvasContext?.drawImage(image, cursorX, cursorY, imageWidth, imageHeight)
            if (cursorY > cursorY + imageHeight + values.tillingSpacingY) {
                return // To avoid an infinite loop (play In Stars and Time btw)
            }
            cursorY += imageHeight + values.tillingSpacingY
        }
        if (cursorX > cursorX + imageWidth + values.tillingSpacingX) {
            return // To avoid an infinite loop (play Outer Wilds btw)
        }
        cursorX += imageWidth + values.tillingSpacingX
    }
}

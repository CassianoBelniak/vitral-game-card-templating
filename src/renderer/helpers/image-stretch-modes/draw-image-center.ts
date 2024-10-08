import { ImageValues } from '../../classes/component-image.js'

export default function drawImageCenter(image: HTMLCanvasElement, target: HTMLCanvasElement, values: ImageValues) {
    const canvasContext = target.getContext('2d')
    const centerX = target.width / 2
    const centerY = target.height / 2
    const offsetX = image.width / 2
    const offsetY = image.height / 2
    canvasContext?.drawImage(image, centerX - offsetX, centerY - offsetY, image.width, image.height)
}

import { ImageValues } from '../../classes/component-image.js'

export default function drawImageFitX(image: HTMLCanvasElement, target: HTMLCanvasElement, values: ImageValues) {
    const canvasContext = target.getContext('2d')
    const ratio = target.width / image.width
    const centerY = target.height / 2
    const height = ratio * image.height
    const offsetY = height / 2
    canvasContext?.drawImage(image, 0, centerY - offsetY, target.width, height)
}

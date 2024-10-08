import { ImageValues } from '../../classes/component-image.js'

export default function drawImageStretch(image: HTMLCanvasElement, target: HTMLCanvasElement, values: ImageValues) {
    const canvasContext = target.getContext('2d')
    canvasContext?.drawImage(image, 0, 0, target.width, target.height)
}

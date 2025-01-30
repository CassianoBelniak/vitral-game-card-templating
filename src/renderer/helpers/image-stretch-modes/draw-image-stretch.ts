export default function drawImageStretch(image: HTMLCanvasElement, target: HTMLCanvasElement) {
    const canvasContext = target.getContext('2d')
    canvasContext?.drawImage(image, 0, 0, target.width, target.height)
}

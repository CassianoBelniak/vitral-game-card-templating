export default function drawImageFitY(image: HTMLCanvasElement, target: HTMLCanvasElement) {
    const canvasContext = target.getContext('2d')
    const ratio = target.height / image.height
    const centerX = target.width / 2
    const width = ratio * image.width
    const offsetX = width / 2
    canvasContext?.drawImage(image, centerX - offsetX, 0, width, target.height)
}

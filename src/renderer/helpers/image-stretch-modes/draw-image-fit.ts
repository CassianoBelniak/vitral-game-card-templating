export default function drawImageFit(image: HTMLCanvasElement, target: HTMLCanvasElement) {
    const canvasContext = target.getContext('2d')
    const ratioX = target.width / image.width
    const ratioY = target.height / image.height

    if (ratioX < ratioY) {
        const centerY = target.height / 2
        const height = ratioX * image.height
        const offsetY = height / 2
        canvasContext?.drawImage(image, 0, centerY - offsetY, target.width, height)
    } else {
        const centerX = target.width / 2
        const width = ratioY * image.width
        const offsetX = width / 2
        canvasContext?.drawImage(image, centerX - offsetX, 0, width, target.height)
    }
}

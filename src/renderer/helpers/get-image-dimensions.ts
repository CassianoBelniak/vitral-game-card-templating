export default function getImageDimensions(
    base64: string,
): Promise<{ width: number; height: number }> {
    return new Promise(function (resolved) {
        const image = new Image()
        image.onload = function () {
            resolved({ width: image.width, height: image.height })
        }
        image.src = base64
    })
}

import { ComponentImage } from '../../classes/component-image.js'
import { Rect } from '../../classes/rect.js'
import { imagesStore } from '../../stores/images-store.js'
import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintImageOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentImage
    variables: { [key: string]: string }
}

function getScale(flip: boolean) {
    if (flip) {
        return -1
    }
    return 1
}

function getPos(size: number, flip: boolean) {
    if (flip) {
        return size
    }
    return 0
}

function getImageCanvas(image: HTMLImageElement, flipX: boolean, flipY: boolean) {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const canvasContext = canvas.getContext('2d')

    canvasContext!.translate(getPos(image.width, flipX), getPos(image.height, flipY))
    canvasContext!.scale(getScale(flipX), getScale(flipY))
    canvasContext!.drawImage(image, 0, 0)
    return canvas
}

export default async function paintImage({ ctx, component, variables }: PaintImageOptions) {
    try {
        const values = await component.getValues(variables)
        const imageData = imagesStore.images[values.name]
        if (!values.name || !imageData) return
        const rect = new Rect(values)
        rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)
        Object.assign(ctx, values.context)
        const imageCanvas = getImageCanvas(imageData.image, values.flipX, values.flipY)
        ctx.drawImage(imageCanvas, rect.x, rect.y, rect.width, rect.height)
        resetContext(ctx)
    } catch (error) {
        console.log('Error', error)
    }
}

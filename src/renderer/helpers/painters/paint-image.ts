import { ComponentImage, ImageValues } from '../../classes/component-image.js'
import { Rect } from '../../classes/rect.js'
import { imagesStore } from '../../stores/images-store.js'
import drawImageCenter from '../image-stretch-modes/draw-image-center.js'
import drawImageCover from '../image-stretch-modes/draw-image-cover.js'
import drawImageFitX from '../image-stretch-modes/draw-image-fit-x.js'
import drawImageFitY from '../image-stretch-modes/draw-image-fit-y.js'
import drawImageFit from '../image-stretch-modes/draw-image-fit.js'
import drawImageStretch from '../image-stretch-modes/draw-image-stretch.js'
import drawImageTile from '../image-stretch-modes/draw-image-tile.js'
import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintImageOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentImage
    variables: { [key: string]: string }
}

const IMAGE_PAINTERS: {
    [key: string]: (image: HTMLCanvasElement, target: HTMLCanvasElement, values: ImageValues) => void
} = {
    stretch: drawImageStretch,
    center: drawImageCenter,
    tile: drawImageTile,
    'fit-x': drawImageFitX,
    'fit-y': drawImageFitY,
    cover: drawImageCover,
    fit: drawImageFit,
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

function getContentCanvas(imageCanvas: HTMLCanvasElement, values: ImageValues, rect: Rect) {
    const canvas = document.createElement('canvas')
    canvas.width = rect.width
    canvas.height = rect.height
    const imagePainter = IMAGE_PAINTERS[values.stretchMode]
    imagePainter(imageCanvas, canvas, values)
    return canvas
}

export default async function paintImage({ ctx, component, variables }: PaintImageOptions) {
    try {
        const values = await component.getValues(variables)
        const imageData = imagesStore.images[values.name]
        if (!imageData) return
        const rect = new Rect(values)
        rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)
        Object.assign(ctx, values.context)
        const imageCanvas = getImageCanvas(imageData.image, values.flipX, values.flipY)
        const contentCanvas = getContentCanvas(imageCanvas, values, rect)
        ctx.drawImage(contentCanvas, rect.x, rect.y, rect.width, rect.height)
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
        rotateContext(ctx, rect, -values.rotation, values.offsetX, values.offsetY)
        resetContext(ctx)
    } catch (error) {
        console.log('Error', error)
    }
}

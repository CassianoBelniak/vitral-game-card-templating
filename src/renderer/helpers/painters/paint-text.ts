import { ComponentText } from '../../classes/component-text.js'
import { Rect } from '../../classes/rect.js'
import { getContentHeight, getTextCanvas } from '../draw-multiline-text.js'

import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintTextOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentText
    variables: { [key: string]: string }
}

function getCanvasOffset(canvasHeight: number, textHeight: number, alignment: string) {
    if (alignment === 'top') return 0
    if (alignment === 'bottom') return canvasHeight - textHeight
    return canvasHeight / 2 - textHeight / 2
}

export default async function paintText({ ctx, component, variables }: PaintTextOptions) {
    const values = await component.getValues(variables)

    ctx.font = `${values.fontSize}px '${values.font}'`
    ctx.textBaseline = 'top'
    ctx.fillStyle = values.color

    const contentHeight = getContentHeight({
        ctx,
        text: values.text,
        width: values.width,
        lineHeight: values.lineHeight,
    })
    if (!values.height) {
        values.height = contentHeight
    }

    const rect = new Rect(values)
    rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)

    Object.assign(ctx, values.context)

    const textCanvas = getTextCanvas(ctx, values)

    if (textCanvas.width && textCanvas.height) {
        const offset = getCanvasOffset(values.height, textCanvas.height, values.verticalAlign)
        ctx.drawImage(textCanvas, values.x, values.y + offset)
    }

    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height) // debug

    rotateContext(ctx, rect, -values.rotation, values.offsetX, values.offsetY)
    resetContext(ctx)
}

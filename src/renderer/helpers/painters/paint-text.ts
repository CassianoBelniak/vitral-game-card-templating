import { ComponentText } from '../../classes/component-text.js'
import { Rect } from '../../classes/rect.js'
import { getTextCanvas } from '../draw-multiline-text.js'

import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintTextOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentText
    variables: { [key: string]: string }
}



export default async function paintText({ ctx, component, variables }: PaintTextOptions) {
    const values = await component.getValues(variables)

    const rect = new Rect(values)
    rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)

    Object.assign(ctx, values.context)

    const textCanvas = getTextCanvas(values)

    if (textCanvas.width && textCanvas.height) {
        ctx.drawImage(textCanvas, values.x, values.y)
    }

    rotateContext(ctx, rect, -values.rotation, values.offsetX, values.offsetY)
    resetContext(ctx)
}

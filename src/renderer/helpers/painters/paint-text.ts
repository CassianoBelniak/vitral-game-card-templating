import { ComponentText } from '../../classes/component-text.js'
import { Rect } from '../../classes/rect.js'
import drawMultilineText from '../draw-multiline-text.js'
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
    ctx.fillStyle = values.color
    rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)
    Object.assign(ctx, values.context)
    drawMultilineText(ctx, values.text, {
        font: values.font,
        isFilled: values.isFilled,
        rect: rect,
        lineHeight: values.lineHeight,
        fontSize: values.fontSize,
        verticalAlign: values.verticalAlign,
        tooltipColor: values.tooltipColor,
        color: values.color,
    })
    rotateContext(ctx, rect, -values.rotation, values.offsetX, values.offsetY)
    resetContext(ctx)
}

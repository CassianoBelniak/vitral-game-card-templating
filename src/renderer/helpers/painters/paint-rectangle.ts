import ComponentRectangle from '../../classes/ComponentRectangle.js'
import { Rect } from '../../classes/rect.js'
import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintRectangleOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentRectangle
    variables: { [key: string]: string }
}

export default async function paintRectangle({
    ctx,
    component,
    variables,
}: PaintRectangleOptions) {
    const values = await component.getValues(variables)
    const rect = new Rect(values)
    ctx.fillStyle = values.color
    rotateContext(ctx, rect, values.rotation)
    Object.assign(ctx, values.context)
    console.log(rect)
    if (component.isFilled) {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
    } else {
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
    }
    resetContext(ctx)
}

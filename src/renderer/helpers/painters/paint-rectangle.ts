import { ComponentRectangle } from '../../classes/component-rectangle.js'
import { Rect } from '../../classes/rect.js'
import { PaintResultMetadata } from '../../typings/painter.js'
import { rotateContext } from '../rotate-context.js'

interface PaintRectangleOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentRectangle
    variables: { [key: string]: string }
}

export default async function paintRectangle({ ctx, component, variables }: PaintRectangleOptions): Promise<PaintResultMetadata> {
    if (!component.isVisible) return { usedFonts: [], usedImages: [] }
    const values = await component.getValues(variables)
    const rect = new Rect(values)
    ctx.fillStyle = values.color
    ctx.strokeStyle = values.color
    ctx.lineWidth = values.borderWidth
    rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)
    Object.assign(ctx, values.context)
    if (component.isFilled) {
        ctx.fillRect(rect.x - values.offsetX, rect.y - values.offsetY, rect.width, rect.height)
    } else {
        ctx.strokeRect(rect.x - values.offsetX, rect.y - values.offsetY, rect.width, rect.height)
    }
    rotateContext(ctx, rect, -values.rotation, values.offsetX, values.offsetY)
    return { usedFonts: [], usedImages: [] }
}

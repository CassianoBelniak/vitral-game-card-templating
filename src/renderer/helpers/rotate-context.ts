import { Rect } from '../classes/rect.js'

export function rotateContext(
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    ammount: number,
    offsetX: number,
    offsetY: number,
) {
    if (ammount) {
        ctx.translate(rect.x + rect.width / 2 - offsetX, rect.y + rect.height / 2 - offsetY)
        ctx.rotate(ammount)
        ctx.translate(-(rect.x + rect.width / 2 - offsetX), -(rect.y + rect.height / 2 - offsetY))
    }
}

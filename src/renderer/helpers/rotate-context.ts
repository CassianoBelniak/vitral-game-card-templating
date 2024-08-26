import { Rect } from '../classes/rect.js'

export function rotateContext(
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    ammount: number,
) {
    if (ammount) {
        ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2)
        ctx.rotate(ammount)
        ctx.translate(-(rect.x + rect.width / 2), -(rect.y + rect.height / 2))
    }
}

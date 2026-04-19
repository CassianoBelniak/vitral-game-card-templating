import { Rect } from '../classes/rect.js'

export function rotateContext(ctx: CanvasRenderingContext2D, rect: Rect, amount: number, offsetX: number, offsetY: number) {
    if (amount) {
        ctx.translate(rect.x + rect.width / 2 - offsetX, rect.y + rect.height / 2 - offsetY)
        ctx.rotate(amount)
        ctx.translate(-(rect.x + rect.width / 2 - offsetX), -(rect.y + rect.height / 2 - offsetY))
    }
}

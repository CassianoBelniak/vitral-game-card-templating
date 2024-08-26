export class Rect {
    x: number
    y: number
    width: number
    height: number

    constructor({
        x,
        y,
        width,
        height,
    }: {
        x: number
        y: number
        width: number
        height: number
    }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

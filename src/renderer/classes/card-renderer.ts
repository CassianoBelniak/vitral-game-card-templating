import { Component, Template } from '../typings/template.js'

class CardRenderer {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null = null
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    applyTemplate(template: Template) {
        for (const component of template.components) {
            this.applyComponent(component)
        }
    }

    applyComponent(component: Component) {}
}
export default CardRenderer
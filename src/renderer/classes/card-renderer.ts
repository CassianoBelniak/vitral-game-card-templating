import Component from './component.js'
import Template from './template.js'
import paintRectangle from '../helpers/painters/paint-rectangle.js'

const PAINTERS = {
    rectangle: paintRectangle,
}

type Variables = { [key: string]: string }

class CardRenderer {
    private ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        ctx.reset()
    }

    async applyTemplate(template: Template, variables: Variables = {}) {
        for (const component of template.components) {
            await this.applyComponent(component, {
                ...variables,
                ...template.previewVariables,
            })
        }
    }

    async applyComponent(component: Component, variables: Variables = {}) {
        const painterType = component.type as keyof typeof PAINTERS
        const painter = PAINTERS[painterType]
        if (painter) {
            painter({
                ctx: this.ctx,
                component,
                variables,
            })
        }
    }
}
export default CardRenderer

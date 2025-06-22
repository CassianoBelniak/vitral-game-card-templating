import { Rect } from '../classes/rect.js'
import Template from '../classes/template.js'
import { rotateContext } from './rotate-context.js'

export default async function renderGuides(template: Template, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    ctx.lineWidth = 6
    ctx.strokeStyle = '#d95d3b'
    for (const component of template.components) {
        if (!component.drawGuides) continue
        const values = await component.getValues(template.previewVariables)
        const rect = new Rect(values)
        rotateContext(ctx, rect, values.rotation, values.offsetX, values.offsetY)
        ctx.strokeRect(rect.x - values.offsetX, rect.y - values.offsetY, values.guideWidth, values.guideHeight)
        const grad = ctx.createLinearGradient(0, 0, values.guideWidth, values.guideHeight)
        grad.addColorStop(0, `#d1310444`)
        grad.addColorStop(1, `#d95d3b44`)
        ctx.fillStyle = grad
        ctx.fillRect(rect.x - values.offsetX, rect.y - values.offsetY, values.guideWidth, values.guideHeight)
    }
}

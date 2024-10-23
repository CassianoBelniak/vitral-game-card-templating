import { Rect } from '../classes/rect.js'
import Template from '../classes/template.js'

export default async function renderGuides(template: Template, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    ctx.lineWidth = 6
    ctx.strokeStyle = '#d95d3b'
    for (const component of template.components) {
        if (!component.drawGuides) continue
        const values = await component.getValues()
        const rect = new Rect(values)
        const height = rect.height || component.getDefaultGuideHeight()
        ctx.strokeRect(rect.x, rect.y, rect.width, height)
        const grad = ctx.createLinearGradient(0, 0, rect.width, height)
        grad.addColorStop(0, `#d1310444`)
        grad.addColorStop(1, `#d95d3b44`)
        ctx.fillStyle = grad
        ctx.fillRect(rect.x, rect.y, rect.width, height)
    }
}

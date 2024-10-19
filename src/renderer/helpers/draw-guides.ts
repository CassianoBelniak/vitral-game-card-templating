import stc from 'string-to-color'
import { Rect } from '../classes/rect.js'
import Template from '../classes/template.js'

export default async function renderGuides(template: Template, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    ctx.lineWidth = 6
    for (const component of template.components) {
        if (!component.drawGuides) continue
        const values = await component.getValues()
        const rect = new Rect(values)
        const height = rect.height || component.getDefaultGuideHeight()
        const grad = ctx.createLinearGradient(0, 0, rect.width, height)
        grad.addColorStop(0, `${stc(component.id)}44`)
        grad.addColorStop(1, `${stc(component.id + 'red')}44`)
        ctx.strokeStyle = stc(component.id)
        ctx.fillStyle = grad
        ctx.strokeRect(rect.x, rect.y, rect.width, height)
        ctx.fillRect(rect.x, rect.y, rect.width, height)
    }
}

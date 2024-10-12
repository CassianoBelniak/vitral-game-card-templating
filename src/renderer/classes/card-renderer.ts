import Template from './template.js'
import paintRectangle from '../helpers/painters/paint-rectangle.js'
import paintImage from '../helpers/painters/paint-image.js'
import { Component } from './component.js'
import paintText from '../helpers/painters/paint-text.js'
import { Card } from '../typings/card.js'
import { templatesStore } from '../stores/templates-store.js'

const PAINTERS = {
    rectangle: paintRectangle,
    image: paintImage,
    text: paintText,
}

type Variables = { [key: string]: string }

class CardRenderer {
    private ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    shift(x: number, y: number) {
        this.ctx.translate(x, y)
    }

    resetTransform() {
        this.ctx.resetTransform()
    }

    async applyCard(card: Card, templatesNames: string[]) {
        for (const templateName of templatesNames) {
            const template = templatesStore.templates[templateName]
            await this.applyTemplate(template, card.variables)
        }
    }

    async applyTemplate(template: Template, variables: Variables = {}) {
        if (!template) return
        for (const component of template.components) {
            await this.applyComponent(component, {
                ...template.previewVariables,
                ...variables,
            })
        }
    }

    async applyComponent(component: Component, variables: Variables = {}) {
        try {
            const painterType = component.type as keyof typeof PAINTERS
            const painter = PAINTERS[painterType]
            if (painter) {
                await painter({
                    ctx: this.ctx,
                    component,
                    variables,
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default CardRenderer

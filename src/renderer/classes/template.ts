import { Component } from './component.js'

export interface TemplateJSON {
    name: string
    components: Object[]
    previewVariables: { [key: string]: string }
}

export default class Template {
    id: string = Math.random().toString(36).substring(2)
    name: string = ''
    components: Component[] = []
    previewVariables: { [key: string]: string } = {}

    getVariables(): string[] {
        return this.components.map((component) => component.getVariables()).flat()
    }

    clone(): Template {
        const template = new Template()
        template.name = this.name
        template.components = this.components.map((component) => component.clone())
        template.previewVariables = this.previewVariables
        template.id = Math.random().toString(36).substring(2)
        return template
    }

    static fromJSON(json: TemplateJSON): Template {
        const template = new Template()
        template.name = json.name
        template.previewVariables = json.previewVariables
        return template
    }
}

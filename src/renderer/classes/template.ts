import { Component } from './component.js'

export interface TemplateJSON {
    name: string
    components: object[]
    previewVariables: { [key: string]: string }
}

export default class Template {
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
        return template
    }

    static fromJSON(json: TemplateJSON): Template {
        const template = new Template()
        template.name = json.name
        template.previewVariables = { ...json.previewVariables }
        return template
    }
}

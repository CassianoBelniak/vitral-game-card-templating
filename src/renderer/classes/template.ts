import Component from './component.js'

export default class Template {
    name: string = ''
    components: Component[] = []
    previewVariables: { [key: string]: string } = {}

    getVariables(): string[] {
        return this.components
            .map((component) => component.getVariables())
            .flat()
    }

    clone(): Template {
        const template = new Template()
        template.name = this.name
        template.components = this.components.map((component) =>
            component.clone(),
        )
        template.previewVariables = this.previewVariables
        return template
    }
}

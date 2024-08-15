import Component from './component.js'

export default class Template {
    name: string = ''
    components: Component[] = []
    previewVariables: { [key: string]: string } = {}

    getVariables(): string[] {
        return this.components.map(component => component.getVariables()).flat()
    }
}

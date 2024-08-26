export default class Component {
    id: string = Math.random().toString(36).substring(2)
    type: string = 'empty'
    context: object = {}

    getVariables(): string[] {
        return []
    }

    clone(): Component {
        const component = new Component()
        component.id = this.id
        component.type = this.type
        component.context = this.context
        return component
    }
}

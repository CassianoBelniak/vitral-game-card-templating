export interface ComponentJSON {
    id: string
    type: string
    context: object
}

export class Component {
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

    static fromJSON(json: ComponentJSON): Component {
        const component = new Component()
        component.id = json.id
        component.type = json.type
        component.context = json.context
        return component
    }
}

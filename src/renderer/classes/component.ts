export class Component {
    type: string = 'empty'
    context: object = {}
    isVisible: boolean = true
    drawGuides: boolean = false
    label: string = 'Component'

    getVariables(): string[] {
        return []
    }

    async getValues() {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
        }
    }

    getDefaultGuideHeight() {
        return 0
    }

    static getInstance() {
        return new Component()
    }

    clone(): Component {
        const clonedObject = (this.constructor as typeof Component).getInstance()
        Object.assign(clonedObject, this)
        return clonedObject
    }

    static fromJSON(source: object) {
        const instance = this.getInstance()
        Object.assign(instance, source)
        return instance
    }
}

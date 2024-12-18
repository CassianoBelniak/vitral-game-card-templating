export class Component {
    type: string = 'empty'
    context: object = {}
    isVisible: boolean = true
    drawGuides: boolean = false
    label: string = 'Component'

    getVariables(): string[] {
        return []
    }

    async getValues(_variables: { [key: string]: string } = {}) {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            offsetX: 0,
            offsetY: 0,
            rotation: 0,
            guideWidth: 0,
            guideHeight: 0,
        }
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

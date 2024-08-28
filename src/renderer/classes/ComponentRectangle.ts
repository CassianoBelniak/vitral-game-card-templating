import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import Parser from '../helpers/parser.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { Component, ComponentJSON } from './component.js'

export interface ComponentRectangleJSON extends ComponentJSON {
    width: string
    height: string
    x: string
    y: string
    offsetX: string
    offsetY: string
    rotation: string
    color: string
    isFilled: boolean
    borderWidth: string
}

export class ComponentRectangle extends Component {
    type = 'rectangle'
    width: string = ''
    height: string = ''
    x: string = ''
    y: string = ''
    offsetX: string = ''
    offsetY: string = ''
    rotation: string = ''
    color: string = '#000000'
    isFilled: boolean = true
    borderWidth: string = '1'

    getVariables() {
        return [
            ...extractVariablesFromText(this.width),
            ...extractVariablesFromText(this.height),
            ...extractVariablesFromText(this.x),
            ...extractVariablesFromText(this.y),
            ...extractVariablesFromText(this.offsetX),
            ...extractVariablesFromText(this.offsetY),
            ...extractVariablesFromText(this.rotation),
            ...extractVariablesFromText(this.color),
            ...extractVariablesFromText(this.borderWidth),
        ]
    }

    async getValues(variables: { [key: string]: string } = {}) {
        const dimensions = {
            width: projectConfigStore.width,
            height: projectConfigStore.height,
        }
        return {
            width: new Parser(this.width)
                .variables(variables)
                .default(dimensions.width)
                .toPixels(),
            height: new Parser(this.height)
                .variables(variables)
                .default(dimensions.height)
                .toPixels(),
            x: new Parser(this.x).variables(variables).default('0').toPixels(),
            y: new Parser(this.y).variables(variables).default('0').toPixels(),
            offsetX: new Parser(this.offsetX)
                .variables(variables)
                .default('0')
                .toPixels(),
            offsetY: new Parser(this.offsetY)
                .variables(variables)
                .default('0')
                .toPixels(),
            rotation: new Parser(this.rotation)
                .variables(variables)
                .default('0')
                .toNumber(),
            color: new Parser(this.color)
                .variables(variables)
                .default('#000000')
                .toString(),
            isFilled: this.isFilled,
            context: this.context,
            borderWidth: new Parser(this.borderWidth)
                .variables(variables)
                .default('1')
                .toPixels(),
        }
    }

    clone(): ComponentRectangle {
        const component = new ComponentRectangle()
        component.id = this.id
        component.type = this.type
        component.width = this.width
        component.height = this.height
        component.x = this.x
        component.y = this.y
        component.offsetX = this.offsetX
        component.offsetY = this.offsetY
        component.rotation = this.rotation
        component.color = this.color
        component.isFilled = this.isFilled
        component.context = this.context
        return component
    }

    static fromJSON(json: ComponentRectangleJSON): ComponentRectangle {
        const component = new ComponentRectangle()
        component.id = json.id
        component.type = json.type
        component.width = json.width
        component.height = json.height
        component.x = json.x
        component.y = json.y
        component.offsetX = json.offsetX
        component.offsetY = json.offsetY
        component.rotation = json.rotation
        component.color = json.color
        component.isFilled = json.isFilled
        component.context = json.context
        return component
    }
}

import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import getCardSize from '../helpers/get-card-size.js'
import Parser from '../helpers/parser.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { Component } from './component.js'

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
    borderWidth: string = ''
    label: string = 'Rectangle'

    static getInstance() {
        return new ComponentRectangle()
    }

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
        const cardDimensions = getCardSize()
        const dimensions = {
            width: projectConfigStore.width,
            height: projectConfigStore.height,
        }
        const width = new Parser(this.width)
            .base(cardDimensions.width)
            .variables(variables)
            .default(dimensions.width)
            .toPixels()
        const height = new Parser(this.height)
            .base(cardDimensions.height)
            .variables(variables)
            .default(dimensions.height)
            .toPixels()
        return {
            width,
            height,
            x: new Parser(this.x).base(cardDimensions.width).variables(variables).default('0').toPixels(),
            y: new Parser(this.y).base(cardDimensions.height).variables(variables).default('0').toPixels(),
            offsetX: new Parser(this.offsetX).base(width).variables(variables).default('0').toPixels(),
            offsetY: new Parser(this.offsetY).base(height).variables(variables).default('0').toPixels(),
            rotation: new Parser(this.rotation).base(360).variables(variables).default('0').toDegrees(),
            color: new Parser(this.color).variables(variables).default('#000000').toString(),
            isFilled: this.isFilled,
            context: this.context,
            borderWidth: new Parser(this.borderWidth).variables(variables).default('1').toPixels(),
        }
    }
}

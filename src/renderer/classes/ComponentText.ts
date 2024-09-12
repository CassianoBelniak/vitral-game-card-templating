import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import Parser from '../helpers/parser.js'
import { Component, ComponentJSON } from './component.js'

export interface ComponentTextJSON extends ComponentJSON {
    width: string
    height: string
    x: string
    y: string
    offsetX: string
    offsetY: string
    rotation: string
    color: string
    text: string
    alignment: string
    font: string
    tooltipColor: string
    verticalAlign: string
    lineHeight: string
}

export class ComponentText extends Component {
    type = 'text'
    width: string = ''
    height: string = ''
    x: string = ''
    y: string = ''
    offsetX: string = ''
    offsetY: string = ''
    rotation: string = ''
    color: string = '#000000'
    isFilled: boolean = true
    fontSize: string = '16px'
    text: string = ''
    alignment: string = 'center'
    font: string = ''
    tooltipColor: string = ''
    verticalAlign: string = ''
    lineHeight: string = ''

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
            ...extractVariablesFromText(this.fontSize),
            ...extractVariablesFromText(this.text),
            ...extractVariablesFromText(this.alignment),
            ...extractVariablesFromText(this.font),
            ...extractVariablesFromText(this.tooltipColor),
            ...extractVariablesFromText(this.verticalAlign),
            ...extractVariablesFromText(this.lineHeight),
        ]
    }

    async getValues(variables: { [key: string]: string } = {}) {
        return {
            width: new Parser(this.width)
                .variables(variables)
                .default('99999px')
                .toPixels(),
            height: new Parser(this.height)
                .variables(variables)
                .default('99999px')
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
            fontSize: new Parser(this.fontSize)
                .variables(variables)
                .default('16px')
                .toPixels(),
            text: new Parser(this.text).variables(variables).toString(),
            alignment: new Parser(this.alignment)
                .variables(variables)
                .toString(),
            context: this.context,
            font: new Parser(this.font).variables(variables).toString(),
            tooltipColor: new Parser(this.tooltipColor)
                .variables(variables)
                .toString(),
            verticalAlign: new Parser(this.verticalAlign)
                .variables(variables)
                .toString(),
            lineHeight: new Parser(this.lineHeight)
                .variables(variables)
                .toNumber(),
        }
    }

    clone(): ComponentText {
        const component = new ComponentText()
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
        component.fontSize = this.fontSize
        component.text = this.text
        component.alignment = this.alignment
        component.context = this.context
        component.font = this.font
        component.tooltipColor = this.tooltipColor
        component.verticalAlign = this.verticalAlign
        component.lineHeight = this.lineHeight
        return component
    }

    static fromJSON(json: ComponentTextJSON): ComponentText {
        const component = new ComponentText()
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
        component.text = json.text
        component.alignment = json.alignment
        component.context = json.context
        component.font = json.font
        component.tooltipColor = json.tooltipColor
        component.verticalAlign = json.verticalAlign
        component.lineHeight = json.lineHeight
        return component
    }
}

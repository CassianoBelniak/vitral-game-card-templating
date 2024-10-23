import { getTextSize } from '../helpers/draw-multiline-text.js'
import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import getCardSize from '../helpers/get-card-size.js'
import Parser from '../helpers/parser.js'
import { Component } from './component.js'

export class ComponentText extends Component {
    type = 'text'
    width: string = ''
    height: string = ''
    x: string = ''
    y: string = ''
    offsetX: string = '50%'
    offsetY: string = '50%'
    rotation: string = ''
    color: string = '#000000'
    isFilled: boolean = true
    fontSize: string = '16px'
    text: string = ''
    alignment: string = 'center'
    font: string = ''
    tooltipColor: string = '#FF0000'
    verticalAlign: string = 'top'
    lineHeight: string = ''
    bottomMargin: string = ''
    topMargin: string = ''
    leftMargin: string = ''
    rightMargin: string = ''
    label: string = 'Text'

    static getInstance() {
        return new ComponentText()
    }

    getDefaultGuideHeight() {
        return 9999
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
            ...extractVariablesFromText(this.fontSize),
            ...extractVariablesFromText(this.text),
            ...extractVariablesFromText(this.alignment),
            ...extractVariablesFromText(this.font),
            ...extractVariablesFromText(this.tooltipColor),
            ...extractVariablesFromText(this.verticalAlign),
            ...extractVariablesFromText(this.lineHeight),
            ...extractVariablesFromText(this.bottomMargin),
            ...extractVariablesFromText(this.topMargin),
        ]
    }

    async getValues(variables: { [key: string]: string } = {}) {
        const cardDimensions = getCardSize()
        const width = new Parser(this.width).base(cardDimensions.width).variables(variables).default('0px').toPixels()
        const height = new Parser(this.height).base(cardDimensions.height).variables(variables).default('0').toPixels()
        const fontSize = new Parser(this.fontSize).variables(variables).default('16px').toPixels()
        const values = {
            width,
            height,
            x: new Parser(this.x).base(cardDimensions.width).variables(variables).default('0').toPixels(),
            y: new Parser(this.y).base(cardDimensions.height).variables(variables).default('0').toPixels(),
            offsetX: new Parser(this.offsetX).base(width).variables(variables).default('0').toPixels(),
            offsetY: new Parser(this.offsetY).base(height).variables(variables).default('0').toPixels(),
            rotation: new Parser(this.rotation).base(360).variables(variables).default('0').toDegrees(),
            color: new Parser(this.color).variables(variables).default('#000000').toString(),
            isFilled: !!this.isFilled,
            fontSize,
            text: new Parser(this.text).variables(variables).toString(),
            alignment: new Parser(this.alignment).default('middle').variables(variables).toString(),
            context: this.context,
            font: new Parser(this.font).variables(variables).toString(),
            tooltipColor: new Parser(this.tooltipColor).default('red').variables(variables).toString(),
            verticalAlign: new Parser(this.verticalAlign).default('top').variables(variables).toString(),
            lineHeight: new Parser(this.lineHeight).default(String(fontSize)).variables(variables).toNumber(),
            bottomMargin: new Parser(this.bottomMargin).variables(variables).default('0px').toNumber(),
            topMargin: new Parser(this.topMargin).variables(variables).default('0px').toNumber(),
            leftMargin: new Parser(this.leftMargin).variables(variables).default('0px').toNumber(),
            rightMargin: new Parser(this.rightMargin).variables(variables).default('0px').toNumber(),
            guideWidth: width,
            guideHeight: height,
        }
        const textSize = getTextSize(values)
        values.guideWidth = textSize.width
        values.guideHeight = textSize.height
        return values
    }
}

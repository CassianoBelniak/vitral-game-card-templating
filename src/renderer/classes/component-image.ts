import { parse as parseSvg } from 'svg-parser'
import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import Parser from '../helpers/parser.js'
import { Image, imagesStore } from '../stores/images-store.js'
import { Component } from './component.js'
import getCardSize from '../helpers/get-card-size.js'
import decodeBase64 from '../helpers/decode-base64.js'

export interface ImageValues {
    width: number
    height: number
    x: number
    y: number
    offsetX: number
    offsetY: number
    rotation: number
    name: string
    context: object
    flipX: boolean
    flipY: boolean
    stretchMode: string
    tillingOffsetX: number
    tillingOffsetY: number
    scaleX: number
    scaleY: number
    tillingSpacingX: number
    tillingSpacingY: number
    imageWidth: number
    imageHeight: number
    guideWidth: number
    guideHeight: number
}

function getRealImageSize(image: Image) {
    if (!image) {
        return {
            width: 0,
            height: 0,
        }
    }
    // SVG does not care about pixels so I need to parse the size myself to be consistent with the project ppi
    if (image.mimeType !== 'image/svg+xml') {
        return {
            width: String(image.image.width),
            height: String(image.image.height),
        }
    }
    const svg = decodeBase64(image.data)
    const parsedSvg = parseSvg(svg)
    return {
        // @ts-expect-error properties is a valid field but the package is not mapping it
        width: String(parsedSvg.children[0]?.properties?.width || image.image.width),
        // @ts-expect-error properties is a valid field but the package is not mapping it
        height: String(parsedSvg.children[0]?.properties?.height || image.image.height),
    }
}

export class ComponentImage extends Component {
    type = 'image'
    width: string = ''
    height: string = ''
    x: string = ''
    y: string = ''
    offsetX: string = ''
    offsetY: string = ''
    rotation: string = ''
    name: string = ''
    flipX = false
    flipY = false
    stretchMode = 'center'
    tillingOffsetX = ''
    tillingOffsetY = ''
    scaleX = '1'
    scaleY = '1'
    tillingSpacingX = ''
    tillingSpacingY = ''
    label: string = 'Image'

    static getInstance() {
        return new ComponentImage()
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
            ...extractVariablesFromText(this.name),
            ...extractVariablesFromText(this.stretchMode),
            ...extractVariablesFromText(this.scaleX),
            ...extractVariablesFromText(this.scaleY),
            ...extractVariablesFromText(this.tillingOffsetX),
            ...extractVariablesFromText(this.tillingOffsetY),
            ...extractVariablesFromText(this.tillingSpacingX),
            ...extractVariablesFromText(this.tillingSpacingY),
        ]
    }

    async getValues(variables: { [key: string]: string } = {}): Promise<ImageValues> {
        const name = new Parser(this.name).variables(variables).toString()
        const cardSize = getCardSize()
        const image = imagesStore.images[name]
        const dimensions = getRealImageSize(image)
        const width = new Parser(this.width).base(cardSize.width).variables(variables).default(String(dimensions.width)).toPixels()
        const height = new Parser(this.height).base(cardSize.height).variables(variables).default(String(dimensions.height)).toPixels()
        const imageWidth = new Parser(String(dimensions.width)).default('0').toPixels()
        const imageHeight = new Parser(String(dimensions.height)).default('0').toPixels()
        return {
            width,
            height,
            x: new Parser(this.x).base(cardSize.width).variables(variables).default('0').toPixels(),
            y: new Parser(this.y).base(cardSize.height).variables(variables).default('0').toPixels(),
            offsetX: new Parser(this.offsetX).base(width).variables(variables).default('0').toPixels(),
            offsetY: new Parser(this.offsetY).base(height).variables(variables).default('0').toPixels(),
            rotation: new Parser(this.rotation).base(360).variables(variables).default('0').toDegrees(),
            name,
            context: this.context,
            flipX: this.flipX,
            flipY: this.flipY,
            stretchMode: new Parser(this.stretchMode).variables(variables).default('center').toString(),
            tillingOffsetX: new Parser(this.tillingOffsetX).variables(variables).default('0').toPixels(),
            tillingOffsetY: new Parser(this.tillingOffsetY).variables(variables).default('0').toPixels(),
            scaleX: new Parser(this.scaleX).variables(variables).default('1').toNumber(),
            scaleY: new Parser(this.scaleY).variables(variables).default('1').toNumber(),
            tillingSpacingX: new Parser(this.tillingSpacingX).variables(variables).default('0').toPixels(),
            tillingSpacingY: new Parser(this.tillingSpacingY).variables(variables).default('0').toPixels(),
            guideWidth: width || imageWidth,
            guideHeight: height || imageHeight,
            imageWidth,
            imageHeight,
        }
    }
}

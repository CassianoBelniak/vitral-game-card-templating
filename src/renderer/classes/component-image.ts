import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import Parser from '../helpers/parser.js'
import { imagesStore } from '../stores/images-store.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import { Component, ComponentJSON } from './component.js'

export interface ComponentImageJSON extends ComponentJSON {
    width: string
    height: string
    x: string
    y: string
    offsetX: string
    offsetY: string
    rotation: string
    name: string
    flipX: boolean
    flipY: boolean
}

function getRatio(width: string, height: string, image_width: string, image_height: string) {
    if (width) {
        const value = new Parser(width).toPixels()
        const image_value = new Parser(image_width).toPixels()
        return image_value / value
    }
    if (height) {
        const value = new Parser(height).toPixels()
        const image_value = new Parser(image_height).toPixels()
        return image_value / value
    }
    return 1
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
        ]
    }

    async getValues(variables: { [key: string]: string } = {}) {
        const name = new Parser(this.name).variables(variables).toString()
        const cardDimensions = projectConfigStore.getParsedSizes()
        const image = imagesStore.images[name] || {}
        const dimensions = {
            width: String(image?.image?.width),
            height: String(image?.image?.height),
        }
        const ratio = getRatio(this.width, this.height, dimensions.width, dimensions.height)
        let width = new Parser(this.width)
            .base(image?.image?.width)
            .variables(variables)
            .default(dimensions.width)
            .toPixels()
        let height = new Parser(this.height)
            .base(image?.image?.height)
            .variables(variables)
            .default(dimensions.height)
            .toPixels()
        if (this.height && !this.width) {
            width /= ratio
        }
        if (!this.height && this.width) {
            height /= ratio
        }
        return {
            width,
            height,
            x: new Parser(this.x).base(cardDimensions.width).variables(variables).default('0').toPixels(),
            y: new Parser(this.y).base(cardDimensions.height).variables(variables).default('0').toPixels(),
            offsetX: new Parser(this.offsetX).base(width).variables(variables).default('0').toPixels(),
            offsetY: new Parser(this.offsetY).base(height).variables(variables).default('0').toPixels(),
            rotation: new Parser(this.rotation).base(360).variables(variables).default('0').toDegrees(),
            name,
            context: this.context,
            flipX: this.flipX,
            flipY: this.flipY,
        }
    }

    clone(): ComponentImage {
        const component = new ComponentImage()
        component.id = this.id
        component.type = this.type
        component.width = this.width
        component.height = this.height
        component.x = this.x
        component.y = this.y
        component.offsetX = this.offsetX
        component.offsetY = this.offsetY
        component.rotation = this.rotation
        component.name = this.name
        component.context = this.context
        component.flipX = this.flipX
        component.flipY = this.flipY
        return component
    }

    static fromJSON(json: ComponentImageJSON): ComponentImage {
        const component = new ComponentImage()
        component.id = json.id
        component.type = json.type
        component.width = json.width
        component.height = json.height
        component.x = json.x
        component.y = json.y
        component.offsetX = json.offsetX
        component.offsetY = json.offsetY
        component.rotation = json.rotation
        component.name = json.name
        component.context = json.context
        component.flipX = json.flipX
        component.flipY = json.flipY
        return component
    }
}

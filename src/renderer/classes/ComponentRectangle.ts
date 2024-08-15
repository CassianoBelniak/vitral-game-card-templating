import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import Component from './component.js'

export default class ComponentRectangle extends Component {
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
        ]
    }
}

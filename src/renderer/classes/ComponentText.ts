import extractVariablesFromText from '../helpers/extraxt-variables-from-text.js'
import Component from './component.js'

export default class ComponentRectangle extends Component {
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
        ]
    }
}

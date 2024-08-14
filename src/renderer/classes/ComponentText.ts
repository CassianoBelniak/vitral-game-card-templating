import Component from './component.js'

export default class ComponentRectangle extends Component {
    type = 'text'
    width: string = ''
    height: string = ''
    x: string = ''
    y: string = ''
    offsetX: string = ''
    offsetY: string = ''
    rotation: number = 0
    color: string = '#000000'
    isFilled: boolean = true
    fontSize: string = '16px'
    text: string = ''
    alignment: string = 'center'
}

import Component from './component.js'

export default class ComponentRectangle extends Component {
    type = 'rectangle'
    width: string = ''
    height: string = ''
    x: string = '0'
    y: string = '0'
    color: string = '#000000'
    isFilled: boolean = true
}

import { Component } from '../classes/component.js'
import { ComponentImage } from '../classes/component-image.js'
import { ComponentRectangle } from '../classes/component-rectangle.js'
import { ComponentText } from '../classes/component-text.js'
import Template, { TemplateJSON } from '../classes/template.js'

const COMPONENTS = {
    rectangle: ComponentRectangle,
    image: ComponentImage,
    text: ComponentText,
}

type ComponentType = 'rectangle' | 'image' | 'text'

function buildComponent(jsonComponent: object): Component {
    const componentClass = COMPONENTS[jsonComponent.type as ComponentType]
    const component = componentClass.fromJSON(jsonComponent)
    return component
}

export default function rebuildTemplateFromJSON(
    jsonTemplate: TemplateJSON,
): Template {
    const template = Template.fromJSON(jsonTemplate)
    template.components = jsonTemplate.components.map(buildComponent)
    return template
}

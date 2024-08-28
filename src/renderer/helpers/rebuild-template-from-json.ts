import { Component } from '../classes/component.js'
import {
    ComponentImage,
    ComponentImageJSON,
} from '../classes/ComponentImage.js'
import {
    ComponentRectangle,
    ComponentRectangleJSON,
} from '../classes/ComponentRectangle.js'
import { ComponentText, ComponentTextJSON } from '../classes/ComponentText.js'
import Template, { TemplateJSON } from '../classes/template.js'

const COMPONENTS = {
    rectangle: ComponentRectangle,
    image: ComponentImage,
    text: ComponentText,
}

type ComponentType = 'rectangle' | 'image' | 'text'

type SpecificComponentJSON =
    | ComponentRectangleJSON
    | ComponentImageJSON
    | ComponentTextJSON

function buildComponent(jsonComponent: SpecificComponentJSON): Component {
    const componentClass = COMPONENTS[jsonComponent.type as ComponentType]
    const component = componentClass.fromJSON(jsonComponent)
    component.id = jsonComponent.id
    return component
}

export default function rebuildTemplateFromJSON(
    jsonTemplate: TemplateJSON,
): Template {
    const template = Template.fromJSON(jsonTemplate)
    template.components = jsonTemplate.components.map(buildComponent)
    return template
}

import { Template } from '../typings/template.js'

export default function duplicateTemplate(template: Template): Template {
    if (!template) {
        return {
            name: 'New template',
            components: [],
        }
    }
    const duplicate = JSON.parse(JSON.stringify(template))
    return duplicate
}

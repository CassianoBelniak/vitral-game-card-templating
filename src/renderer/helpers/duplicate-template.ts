import Template from '../classes/template.js'

export default function duplicateTemplate(template: Template): Template {
    if (!template) {
        return new Template()
    }
    const duplicate = JSON.parse(JSON.stringify(template))
    return duplicate
}

import Template from '../classes/template.js'
import rebuildTemplateFromJSON from './rebuild-template-from-json.js'

export default function duplicateTemplate(template: Template): Template {
    if (!template) {
        return new Template()
    }
    return rebuildTemplateFromJSON(template)
}

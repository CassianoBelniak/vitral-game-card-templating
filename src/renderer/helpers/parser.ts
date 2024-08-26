import { projectConfigStore } from '../stores/project-config-store.js'
import applyVariables from './apply-variables.js'
import convertToPixels from './convert-to-pixels.js'

export default class Parser {
    value: string = ''
    constructor(private text: string) {
        this.value = this.text
    }

    variables(variables: { [key: string]: string } = {}) {
        this.value = applyVariables(this.value, variables)
        return this
    }

    default(defaultValue: string) {
        this.value = this.value || defaultValue
        return this
    }

    toPixels() {
        return convertToPixels(this.value, projectConfigStore.ppi)
    }

    toNumber() {
        return parseFloat(this.value)
    }

    toString() {
        return this.value.trim()
    }
}

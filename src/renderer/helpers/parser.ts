import { projectConfigStore } from '../stores/project-config-store.js'
import applyVariables from './apply-variables.js'
import convertToPixels from './convert-to-pixels.js'

export default class Parser {
    value: string = ''
    baseValue: number = 0
    constructor(private text: string) {
        this.value = this.text || ''
    }

    variables(variables: { [key: string]: string } = {}) {
        this.value = applyVariables(this.value, variables)
        return this
    }

    base(value: number | string) {
        if (typeof value === 'string') {
            this.baseValue = convertToPixels(value, projectConfigStore.ppi)
            return this
        }
        this.baseValue = value
        return this
    }

    default(defaultValue: string) {
        this.value = this.value || defaultValue
        return this
    }

    toPixels() {
        if (this.value.includes('%')) {
            return (+this.value.replace('%', '') / 100) * this.baseValue
        }
        return convertToPixels(this.value, projectConfigStore.ppi)
    }

    toNumber() {
        if (this.value.includes('%')) {
            return (+this.value.replace('%', '') / 100) * this.baseValue
        }
        return parseFloat(this.value)
    }

    toDegrees() {
        if (this.value.includes('%')) {
            return (+this.value.replace('%', '') / 100) * this.baseValue * (Math.PI / 180)
        }
        return parseFloat(this.value) * (Math.PI / 180)
    }

    toString() {
        return this.value.trim()
    }
}

import { projectConfigStore } from '../stores/project-config-store.js'
import applyVariables from './apply-variables.js'
import convertToPixels from './convert-to-pixels.js'

export default class Parser {
    value: string = ''
    baseValue: number = 0
    defaultValue: string = ''
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
        this.defaultValue = defaultValue
        return this
    }

    toPixels() {
        let value = this.value || this.defaultValue
        if (!value || !value.match(/\d/)) {
            value = this.defaultValue
        }
        if (String(value).includes('%')) {
            return (+value.replace('%', '') / 100) * this.baseValue
        }
        return convertToPixels(value, projectConfigStore.ppi)
    }

    toNumber() {
        let value = this.value || this.defaultValue
        if (value.includes('%')) {
            return (+value.replace('%', '') / 100) * this.baseValue
        }
        return parseFloat(value)
    }

    toDegrees() {
        let value = this.value || this.defaultValue
        if (value.includes('%')) {
            return (+value.replace('%', '') / 100) * this.baseValue * (Math.PI / 180)
        }
        return parseFloat(value) * (Math.PI / 180)
    }

    toString() {
        return this.value.trim() || this.defaultValue
    }
}

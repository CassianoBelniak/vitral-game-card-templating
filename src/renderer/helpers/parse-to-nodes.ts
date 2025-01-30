import { startCase } from 'lodash'

interface Slot {
    label: string
    key: string
    value: string
    children: Slot[]
    base: string
}

function searchSlots(slots: Slot[], key: string) {
    for (const slot of slots) {
        if (slot.key === key) {
            return slot
        }
    }
    return null
}

function getNewSlot(key: string, label: string, base: string): Slot {
    return {
        key,
        value: '',
        label,
        children: [],
        base,
    }
}

export default function parseToNodes(content: string[], base: string) {
    const mainNode = getNewSlot(base, startCase(base), base)
    mainNode.value = base
    for (const value of content) {
        const path = [base, ...value.split('/')]
        let currentSlot = mainNode
        let relativePath = ''
        for (const key of path) {
            relativePath = [...relativePath.split('/'), key].filter((i) => i).join('/')
            let foundSlot = searchSlots(currentSlot.children, key)
            if (!foundSlot) {
                foundSlot = getNewSlot(key, key, base)
                foundSlot.value = relativePath
                currentSlot.children.push(foundSlot)
            }
            currentSlot = foundSlot
        }
    }
    return mainNode.children
}

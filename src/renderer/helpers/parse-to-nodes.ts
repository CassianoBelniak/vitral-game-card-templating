interface Slot {
    label: string
    key: string
    value: string
    children: Slot[]
}

function searchSlots(slots: Slot[], key: string) {
    for (const slot of slots) {
        if (slot.key === key) {
            return slot
        }
    }
    return null
}

function getNewSlot(key: string): Slot {
    return {
        key,
        value: '',
        label: key,
        children: [],
    }
}

export default function parseToNodes(content: string[], label: string) {
    const mainNode = getNewSlot(label)
    mainNode.value = label
    for (const value of content) {
        const path = value.split('/')
        let currentSlot = mainNode
        let relativePath = ''
        for (const key of path) {
            relativePath = [...relativePath.split('/'), key].filter((i) => i).join('/')
            let foundSlot = searchSlots(currentSlot.children, key)
            if (!foundSlot) {
                foundSlot = getNewSlot(key)
                foundSlot.value = relativePath
                currentSlot.children.push(foundSlot)
            }
            currentSlot = foundSlot
        }
    }
    return mainNode
}

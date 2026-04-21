<script lang="ts" setup>
import { QInput } from 'quasar'
import { nextTick, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const model = defineModel<string>()
const props = defineProps<{
    includeFonts?: boolean
    includeImages?: boolean
    includeTemplates?: boolean
    includeColors?: boolean
    includeIcons?: boolean
    label?: string
    type?: 'outlined' | 'filled'
}>()

const inputRef = ref<InstanceType<typeof QInput> | null>(null)
const isPopupOpen = ref(false)
const isEditing = ref(false)

async function onUpdateValue(value: string) {
    const el = inputRef.value?.getNativeElement?.() as HTMLInputElement | HTMLTextAreaElement
    if (!el || model.value == null) return

    const start = el.selectionStart ?? model.value.length
    const end = el.selectionEnd ?? model.value.length

    let insertText = value

    if (value.match(/^icons\//m)) {
        insertText = `[${value.replace(/^icons\//m, '')}]`
    } else {
        insertText = value.replace(/(^fonts\/)|(^images\/)|(^templates\/)|(^colors\/)/m, '')
    }

    model.value = model.value.slice(0, start) + insertText + model.value.slice(end)

    isPopupOpen.value = false

    await nextTick()

    const newEl = inputRef.value?.getNativeElement?.() as HTMLInputElement | HTMLTextAreaElement

    if (!newEl) return

    const pos = start + insertText.length
    newEl.focus()
    newEl.setSelectionRange(pos, pos)
}
function focus() {
    inputRef.value?.focus()
}

function onKeyPressed(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        if (!isEditing.value) {
            isEditing.value = !isEditing.value
            e.preventDefault()
        }
    }

    if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        isPopupOpen.value = true
        e.preventDefault()
    }

    if (e.key === 'Escape') {
        isEditing.value = !isEditing.value
        e.preventDefault()
    }
}

defineExpose({
    focus,
})
</script>
<template>
    <q-input
        ref="inputRef"
        v-bind="attrs"
        :debounce="1000"
        class="input"
        dense
        :outlined="!props.type || props.type === 'outlined'"
        :filled="props.type === 'filled'"
        :label="props.label"
        v-model="model"
        :type="isEditing ? 'textarea' : ''"
        @keydown="onKeyPressed"
    >
        <template v-slot:append>
            <q-btn round dense flat icon="colorize" :tabindex="-1">
                <q-popup-proxy v-model="isPopupOpen" class="p-2">
                    <resource-tree
                        :include-fonts="props.includeFonts"
                        :include-images="props.includeImages"
                        :include-templates="props.includeTemplates"
                        :include-colors="props.includeColors"
                        :include-icons="props.includeColors"
                        @selected="onUpdateValue"
                    />
                </q-popup-proxy>
            </q-btn>
        </template>
    </q-input>
</template>
<style lang="scss" scoped>
.tree {
    width: 500px;
    height: 500px;
}
</style>

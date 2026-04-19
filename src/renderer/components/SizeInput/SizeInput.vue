<script lang="ts" setup>
import { ref, watch } from 'vue'
import attemptToEvaluate from '../../helpers/attempt-to-evaluate.js'
import { getValueAmmount, getValueUnit, removeInvalidChars } from '../../helpers/value-handlers.js'

const props = defineProps<{ label: string; hasPercent?: boolean }>()
const model = defineModel<string>({ default: '' })
const amount = ref(getValueAmmount(model.value))
const unit = ref(getValueUnit(model.value))

const unitOptions = ['', 'px', 'in', 'mm']
if (props.hasPercent) {
    unitOptions.push('%')
}

watch(model, () => {
    amount.value = getValueAmmount(model.value)
    unit.value = getValueUnit(model.value)
})

function postValue() {
    const valueUnit = getValueUnit(amount.value || '')
    const filteredValue = removeInvalidChars(amount.value)
    const evaluatedValue = attemptToEvaluate(filteredValue)
    model.value = evaluatedValue + (valueUnit || unit.value)
    unit.value = valueUnit || unit.value
    amount.value = evaluatedValue
}

function updateUnit() {
    model.value = amount.value + unit.value
}

function clearInput() {
    amount.value = ''
    postValue()
}
</script>

<template>
    <div class="flex">
        <q-input class="amount" dense outlined :label="props.label" v-model="amount" @blur="postValue" debounce="100">
            <template v-if="amount" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="clearInput" class="cursor-pointer" />
            </template>
        </q-input>
        <q-select class="w-16" dense outlined :options="unitOptions" v-model="unit" @blur="updateUnit" />
    </div>
</template>
<style scoped>
.amount {
    width: 108px;
}
</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import attemptToEvaluate from '../../helpers/attempt-to-evaluate.js';
    import { getValueAmmount, getValueUnit, removeInvalidChars } from '../../helpers/value-handlers.js';

    const props = defineProps<{ label: string, hasPercent?: boolean }>()
    const model = defineModel<string>({ default: '' })
    const ammount = ref(getValueAmmount(model.value))
    const unit = ref(getValueUnit(model.value))

    const unitOptions = ['', 'px', 'in', 'mm']
    if (props.hasPercent) {
        unitOptions.push('%')
    }

    function postValue() {
        const valueUnit = getValueUnit(ammount.value || '')
        const filteredValue = removeInvalidChars(ammount.value)
        const evaluatedValue = attemptToEvaluate(filteredValue)
        model.value = evaluatedValue + (valueUnit || unit.value)
        unit.value = (valueUnit || unit.value)
        ammount.value = evaluatedValue
    }

    function updateUnit() {
        model.value = ammount.value + unit.value
    }

    function clearInput() {
        ammount.value = ''
        postValue()
    }

</script>

<template>
    <div class="flex">
        <q-input class="ammount" dense outlined :label="props.label" v-model="ammount" @blur="postValue" debounce="100">
            <template v-if="ammount" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="clearInput" class="cursor-pointer" />
            </template>
        </q-input>
        <q-select class="w-16" dense outlined :options="unitOptions" v-model="unit" @blur="updateUnit" />
    </div>
</template>
<style scoped>
    .ammount {
        width: 108px;
    }
</style>
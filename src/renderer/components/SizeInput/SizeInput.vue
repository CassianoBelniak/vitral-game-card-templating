<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ label: string, hasPercent?: boolean }>()
const model = defineModel<string>({ default: '' })

const unitOptions = ['px', 'in', 'mm']
if (props.hasPercent) {
    unitOptions.push('%')
}


const ammount = computed(() => model.value.replace(/[a-z]+$/, ''))
const unit = computed(() => model.value.match(/[a-z]+/)?.[0] || 'px')

function updateAmmount(value: string) {
    model.value = value + unit.value
}

function updateUnit(value: string) {
    model.value = ammount.value + value
}

</script>

<template>
    <div class="flex">
        <q-input class="ammount" dense outlined :label="props.label" :model-value="ammount" type="number"
            @update:model-value="updateAmmount" />
        <q-select dense outlined :options="unitOptions" :model-value="unit" @update:model-value="updateUnit" />
    </div>
</template>
<style scoped>
.ammount {
    width: 80px;
}
</style>
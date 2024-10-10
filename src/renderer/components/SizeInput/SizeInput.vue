<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ label: string, hasPercent?: boolean }>()
const model = defineModel<string>({ default: '' })

const unitOptions = ['','px', 'in', 'mm']
if (props.hasPercent) {
    unitOptions.push('%')
}

const ammount = computed(() => model.value.replace(/(px$|in$|mm$|%$)/, ''))
const unit = computed(() => model.value.match(/(px$|in$|mm$|%$)/)?.[0] || '')

    function updateAmmount(value: string) {
        const filteredValue = value
            .replace(/[^}]+(?![^{]*\})/g, match => match.replace(/[^\d\-.]/g, ''))
        model.value = filteredValue + unit.value
    }

    function updateUnit(value: string) {
        model.value = ammount.value + value
}

</script>

<template>
    <div class="flex">
        <q-input class="ammount" dense outlined :label="props.label" :model-value="ammount"
            @update:model-value="updateAmmount" debounce="100">
            <template v-if="ammount" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="updateAmmount('')" class="cursor-pointer" />
            </template>
        </q-input>
        <q-select class="w-16" dense outlined :options="unitOptions" :model-value="unit"
            @update:model-value="updateUnit" />
    </div>
</template>
<style scoped>
.ammount {
    width: 108px;
}
</style>
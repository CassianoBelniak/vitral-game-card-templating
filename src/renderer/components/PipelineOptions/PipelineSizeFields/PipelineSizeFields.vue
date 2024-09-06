<script lang="ts" setup>
    interface propsInterface {
        isVisible: boolean,
        label: string,
        hideY?: boolean
    }

    const props = defineProps<propsInterface>()
    const modelX = defineModel<string>('x')
    const modelY = defineModel<string>('y')

</script>
<template>
    <template v-if="props.isVisible">
        <p class="pt-4 m-0">{{ props.label }}</p>
        <div class="row my-2">
            <size-input label="X" v-model="modelX"></size-input>
            <template v-if="!props.hideY">
                <div class="text-h6 pt-1 mx-2">X</div>
                <size-input label="Y" v-model="modelY"></size-input>
            </template>
        </div>
    </template>
</template>
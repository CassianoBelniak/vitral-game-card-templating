import { reactive } from 'vue'

export const hashStore = reactive({
    cardFileHashes: {} as Record<string, number>,
})

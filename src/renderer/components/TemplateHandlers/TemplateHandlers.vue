<script lang="ts" setup>
    const emit = defineEmits<{
        moveUp: [],
        moveDown: [],
        delete: [],
        duplicate: []
    }>()
</script>
<template>
    <div>
        <q-btn push icon="more_vert" round flat dense @click.stop>
            <q-popup-proxy>
                <q-btn icon="arrow_upward" round flat dense @click.stop="emit('moveUp')">
                    <q-tooltip>
                        Move up
                    </q-tooltip>
                </q-btn>
                <q-btn icon="arrow_downward" round flat dense @click.stop="emit('moveDown')">
                    <q-tooltip>
                        Move down
                    </q-tooltip>
                </q-btn>
                <q-btn icon="delete" round flat dense @click.stop="emit('delete')">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>
                <q-btn icon="content_copy" round flat dense @click.stop="emit('duplicate')">
                    <q-tooltip>
                        Duplicate
                    </q-tooltip>
                </q-btn>
                <slot key="after"></slot>
            </q-popup-proxy>
        </q-btn>
    </div>
</template>
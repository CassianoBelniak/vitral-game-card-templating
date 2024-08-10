<template>
    <div class="fit-content">
        <slot></slot>
    </div>
</template>
<style lang="sass">
.fit-content
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

.fit-content > *
    max-width: 100%
    max-height: 100%
    object-fit: contain
</style>
<template>
    <div class="column container">
        <TopNavigationBar class="col-auto" />
        <div class="content-pad col">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.container {
    height: 100%;
}

.card-container {
    height: 100%;
}

.content-pad {
    padding-left: 28px;
    padding-right: 28px;
    padding-bottom: 28px;
    flex: 1;
}
</style>
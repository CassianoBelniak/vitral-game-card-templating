<template lang="pug">
ContentPad
    .row.justify-between.items-center
        .text-h6 Cards
        q-btn(push icon="add" align="left" to="/cards/edit" no-caps) New card
    CardList
</template>
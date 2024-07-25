import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GalleryPage from '../pages/GalleryPage.vue'

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/gallery',
        component: GalleryPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

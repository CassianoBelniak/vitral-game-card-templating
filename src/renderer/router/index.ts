import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GalleryPage from '../pages/GalleryPage.vue'
import AssetsPage from '../pages/AssetsPage.vue'
import ConfigsPage from '../pages/ConfigsPage.vue'
import EditCardPage from '../pages/EditCardPage.vue'
import EditTemplatePage from '../pages/EditTemplatePage.vue'
import ExportPage from '../pages/ExportPage.vue'
import TemplatesPage from '../pages/TemplatesPage.vue'

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/gallery',
        component: GalleryPage,
    },
    {
        path: '/assets',
        component: AssetsPage,
    },
    {
        path: '/configs',
        component: ConfigsPage,
    },
    {
        path: '/cards/edit',
        component: EditCardPage,
    },
    {
        path: '/templates/edit',
        name: 'EditTemplate',
        component: EditTemplatePage,
    },
    {
        path: '/export',
        component: ExportPage,
    },
    {
        path: '/templates',
        component: TemplatesPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

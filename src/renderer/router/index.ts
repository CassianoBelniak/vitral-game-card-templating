import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GalleryPage from '../pages/GalleryPage.vue'
import AssetsPage from '../pages/AssetsPage.vue'
import ConfigsPage from '../pages/ConfigsPage.vue'
import EditCardPage from '../pages/EditCardPage.vue'
import EditTemplatePage from '../pages/EditTemplatePage.vue'
import ExportPage from '../pages/ExportPage.vue'
import TemplatesPage from '../pages/TemplatesPage.vue'
import EditExportPipelinePage from '../pages/EditExportPipelinePage.vue'

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/cards',
        name: 'Cards',
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
        name: 'EditCard',
        component: EditCardPage,
    },
    {
        path: '/templates/edit',
        name: 'EditTemplate',
        component: EditTemplatePage,
    },
    {
        path: '/export/edit',
        name: 'EditExportPipeline',
        component: EditExportPipelinePage,
    },
    {
        path: '/export',
        name: 'Export',
        component: ExportPage,
    },
    {
        path: '/templates',
        name: 'Templates',
        component: TemplatesPage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

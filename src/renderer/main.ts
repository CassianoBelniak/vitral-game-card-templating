import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import './global.scss'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import RecentProjects from './components/RecentProjects/RecentProjects.vue'

const app = createApp(App)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    config: {
        dark: true,
    },
})

app.use(router)

app.component('RecentProjects', RecentProjects)

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')





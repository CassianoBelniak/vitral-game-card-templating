import { createApp } from 'vue'
import { Dialog, Notify, Quasar } from 'quasar'
import router from './router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import './global.scss'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
    plugins: {
        Dialog,
        Notify,
    },
    config: {
        dark: true,
    },
})

app.use(router)

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')








import { createApp } from 'vue'
import App from './App.vue'

// import for TailwindCSS
import './style.css'

// import for vuetify
import vuetify from './config/vuetify'

createApp(App)
.use(vuetify)
.mount('#app')

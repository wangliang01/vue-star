import { App } from 'vue'
import Star from './src/Star.vue'

Star.install = (app: App) => {
  app.component('Star', Star)
}

export default Star

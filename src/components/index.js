import Star from './Star.vue'

const install = function (app, opts = {}) {
  app.component('Star', Star)
}

export {
  Star
}

export default {
  install
}

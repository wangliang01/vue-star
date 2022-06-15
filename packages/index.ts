import { App } from 'vue'
import Star from './star'

// 所有组件列表
// const components = [Star]

const install = function (app: App): void {
  // components.map(component => {
  //   app.component(component.name, component)
  // })
  app.component('Star', Star)
}

export {
  Star
}

export default {
  install
}

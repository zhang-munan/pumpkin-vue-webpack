import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

// h是vue中的createApp参数，通过h将App挂载到html里面
// 挂在需要api `.$mount()` ，挂载到html一个节点上面
new Vue({
  render: (h) => h(App)
}).$mount(root)
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

Vue.use(ElementUI) // 注册使用elementUI框架
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

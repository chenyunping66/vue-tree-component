import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui'; //引入
import 'element-ui/lib/theme-chalk/index.css'; //引入样式
Vue.use(ElementUI); //注册使用

export default new Vue({
  el: '#app',
  render: h => h(App)
})
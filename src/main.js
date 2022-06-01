import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import FastClick from 'fastclick'
import 'amfe-flexible/index.js';
import {ymdFormat,mdFormat} from './config/global'
// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
Vue.prototype.$mdFormat = mdFormat;
Vue.prototype.$ymdFormat = ymdFormat;

Vue.config.productionTip = false
// 全局引入UI库 vant
import '@/plugins/vant'


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
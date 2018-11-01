import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import 'vant/lib/vant-css/icon-local.css';
import $router from './components/utils/$router';
import $store from './components/utils/$store';
import $app from './components/views/$app/index.vue';



// 加载组件库
Vue.use(Vant);

// 启动应用
// 创建系统根组件（vm）
export default new Vue({
    el: '#mount',
    router: $router,
    store: $store,
    render: createElement => createElement($app)
});

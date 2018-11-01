/* eslint global-require: 0 */
import Vue from 'vue';
import VueRouter from 'vue-router';



// 加载 vue-router
Vue.use(VueRouter);

/**
 * 路由规则，各页面 vm 均采用异步组件方式实现
 * see:
 * http://webpack.github.io/docs/code-splitting.html#defining-a-split-point
 * https://github.com/vuejs/vue-router/issues/215
 *
 * and here we use CommonJS syntax, see:
 * http://www.it165.net/pro/html/201603/62608.html
 * http://webpack.github.io/docs/code-splitting.html#named-chunks
 */
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: {
            name: 'mall-home'
        }
    }, {
        path: '/mall-home/:userId/:token',
        name: 'mall-home',
        component(resolve) {
            require.ensure(['../../views/mall-home/index.vue'], () => {
                resolve(require('../../views/mall-home/index.vue'));
            }, 'static/views/mall-home/index');
        }
    }, {
        path: '/mall-my-orders',
        name: 'mall-my-orders',
        component(resolve) {
            require.ensure(['../../views/mall-my-orders/index.vue'], () => {
                resolve(require('../../views/mall-my-orders/index.vue'));
            }, 'static/views/mall-my-orders/index');
        }
    }, {
        path: '/confirm-order/:productId/:userCouponId/:groupOrderId/:orderType',
        name: 'confirm-order',
        component(resolve) {
            require.ensure(['../../views/confirm-order/index.vue'], () => {
                resolve(require('../../views/confirm-order/index.vue'));
            }, 'static/views/confirm-order/index');
        }
    }, {
        path: '/shop-detail/:id',
        name: 'shop-detail',
        component(resolve) {
            require.ensure(['../../views/shop-detail/index.vue'], () => {
                resolve(require('../../views/shop-detail/index.vue'));
            }, 'static/views/shop-detail/index');
        }
    }, {
        path: '/order-detail/:productOrderId',
        name: 'order-detail',
        component(resolve) {
            require.ensure(['../../views/order-detail/index.vue'], () => {
                resolve(require('../../views/order-detail/index.vue'));
            }, 'static/views/order-detail/index');
        }
    }, {
        path: '/comment-list/:id/:fromUserId',
        name: 'comment-list',
        component(resolve) {
            require.ensure(['../../views/comment-list/index.vue'], () => {
                resolve(require('../../views/comment-list/index.vue'));
            }, 'static/views/comment-list/index');
        }
    }, {
        path: '/comment/:orderId/:productId/:fromUserId',
        name: 'comment',
        component(resolve) {
            require.ensure(['../../views/comment/index.vue'], () => {
                resolve(require('../../views/comment/index.vue'));
            }, 'static/views/comment/index');
        }
    }]
});

router.beforeEach((to, from, next) => {
    // 系统初始化逻辑
    next();
});

router.afterEach(() => {
    // 切换页面后将屏幕滚动至顶端
    window.scrollTo(0, 0);
});

export default router;

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
            name: 'home'
        }
    }, {
        path: '/home/:rsa',  // 微信首页
        name: 'home',
        component(resolve) {
            require.ensure(['../../views/home/index.vue'], () => {
                resolve(require('../../views/home/index.vue'));
            }, 'static/views/home/index');
        }
    }, {
        path: '/user-center', // 个人信息
        name: 'user-center',
        component(resolve) {
            require.ensure(['../../views/user-center/index.vue'], () => {
                resolve(require('../../views/user-center/index.vue'));
            }, 'static/views/user-center/index');
        }
    }, {
        path: '/edit-name', // 修改昵称
        name: 'edit-name',
        component(resolve) {
            require.ensure(['../../views/edit-name/index.vue'], () => {
                resolve(require('../../views/edit-name/index.vue'));
            }, 'static/views/edit-name/index');
        }
    }, {
        path: '/edit-phone', // 修改手机号--目前取消这个功能
        name: 'edit-phone',
        component(resolve) {
            require.ensure(['../../views/edit-phone/index.vue'], () => {
                resolve(require('../../views/edit-phone/index.vue'));
            }, 'static/views/edit-phone/index');
        }
    }, {
        path: '/edit-job', // 修改职业
        name: 'edit-job',
        component(resolve) {
            require.ensure(['../../views/edit-job/index.vue'], () => {
                resolve(require('../../views/edit-job/index.vue'));
            }, 'static/views/edit-job/index');
        }
    }, {
        path: '/edit-major', // 修改专业
        name: 'edit-major',
        component(resolve) {
            require.ensure(['../../views/edit-major/index.vue'], () => {
                resolve(require('../../views/edit-major/index.vue'));
            }, 'static/views/edit-major/index');
        }
    }, {
        path: '/edit-location', // 修改认证地址
        name: 'edit-location',
        component(resolve) {
            require.ensure(['../../views/edit-location/index.vue'], () => {
                resolve(require('../../views/edit-location/index.vue'));
            }, 'static/views/edit-location/index');
        }
    }, {
        path: '/charge', // 充值
        name: 'charge',
        component(resolve) {
            require.ensure(['../../views/charge/index.vue'], () => {
                resolve(require('../../views/charge/index.vue'));
            }, 'static/views/charge/index');
        }
    }, {
        path: '/hand-input', // 手动输入编码
        name: 'hand-input',
        component(resolve) {
            require.ensure(['../../views/hand-input/index.vue'], () => {
                resolve(require('../../views/hand-input/index.vue'));
            }, 'static/views/hand-input/index');
        }
    }, {
        path: '/order-list', // 订单列表
        name: 'order-list',
        component(resolve) {
            require.ensure(['../../views/order-list/index.vue'], () => {
                resolve(require('../../views/order-list/index.vue'));
            }, 'static/views/order-list/index');
        }
    }, {
        path: '/machine-list/:areaId', // 洗衣机列表
        name: 'machine-list',
        component(resolve) {
            require.ensure(['../../views/machine-list/index.vue'], () => {
                resolve(require('../../views/machine-list/index.vue'));
            }, 'static/views/machine-list/index');
        }
    }, {
        path: '/mode-pay/:washerId', // 模式支付--选择模式支付页面
        name: 'mode-pay',
        component(resolve) {
            require.ensure(['../../views/mode-pay/index.vue'], () => {
                resolve(require('../../views/mode-pay/index.vue'));
            }, 'static/views/mode-pay/index');
        }
    }, {
        path: '/address-list', // 地址列表
        name: 'address-list',
        component(resolve) {
            require.ensure(['../../views/address-list/index.vue'], () => {
                resolve(require('../../views/address-list/index.vue'));
            }, 'static/views/address-list/index');
        }
    }, {
        path: '/perfect-information', // 完善信息
        name: 'perfect-information',
        component(resolve) {
            require.ensure(['../../views/perfect-information/index.vue'], () => {
                resolve(require('../../views/perfect-information/index.vue'));
            }, 'static/views/perfect-information/index');
        }
    }, {
        path: '/money-detail', // 充值明细
        name: 'money-detail',
        component(resolve) {
            require.ensure(['../../views/money-detail/index.vue'], () => {
                resolve(require('../../views/money-detail/index.vue'));
            }, 'static/views/money-detail/index');
        }
    }, {
        path: '/wash-order-detail', // 洗衣订单详情
        name: 'wash-order-detail',
        component(resolve) {
            require.ensure(['../../views/wash-order-detail/index.vue'], () => {
                resolve(require('../../views/wash-order-detail/index.vue'));
            }, 'static/views/wash-order-detail/index');
        }
    }, {
        path: '/my-coupons', // 我的优惠券
        name: 'my-coupons',
        component(resolve) {
            require.ensure(['../../views/my-coupons/index.vue'], () => {
                resolve(require('../../views/my-coupons/index.vue'));
            }, 'static/views/my-coupons/index');
        }
    }, {
        path: '/meal', // 月卡
        name: 'meal',
        component(resolve) {
            require.ensure(['../../views/meal/index.vue'], () => {
                resolve(require('../../views/meal/index.vue'));
            }, 'static/views/meal/index');
        }
    }, {
        path: '/meal-list', // 月卡列表
        name: 'meal-list',
        component(resolve) {
            require.ensure(['../../views/meal-list/index.vue'], () => {
                resolve(require('../../views/meal-list/index.vue'));
            }, 'static/views/meal-list/index');
        }
    }, {
        path: '/operation-manual', // 操作指南
        name: 'operation-manual',
        component(resolve) {
            require.ensure(['../../views/operation-manual/index.vue'], () => {
                resolve(require('../../views/operation-manual/index.vue'));
            }, 'static/views/operation-manual/index');
        }
    }, {
        path: '/wash-manual', // 洗衣指南
        name: 'wash-manual',
        component(resolve) {
            require.ensure(['../../views/wash-manual/index.vue'], () => {
                resolve(require('../../views/wash-manual/index.vue'));
            }, 'static/views/wash-manual/index');
        }
    }, {
        path: '/newman-manual', // 新手指导
        name: 'newman-manual',
        component(resolve) {
            require.ensure(['../../views/newman-manual/index.vue'], () => {
                resolve(require('../../views/newman-manual/index.vue'));
            }, 'static/views/newman-manual/index');
        }
    }, {
        path: '/exception-manual', // 异常情况
        name: 'exception-manual',
        component(resolve) {
            require.ensure(['../../views/exception-manual/index.vue'], () => {
                resolve(require('../../views/exception-manual/index.vue'));
            }, 'static/views/exception-manual/index');
        }
    }, {
        path: '/mall-home',
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
        path: '/recharge-des', // 充值说明
        name: 'recharge-des',
        component(resolve) {
            require.ensure(['../../views/recharge-des/index.vue'], () => {
                resolve(require('../../views/recharge-des/index.vue'));
            }, 'static/views/recharge-des/index');
        }
    }, {
        path: '/about-us', // 关于悠洗--微信端暂时不显示
        name: 'about-us',
        component(resolve) {
            require.ensure(['../../views/about-us/index.vue'], () => {
                resolve(require('../../views/about-us/index.vue'));
            }, 'static/views/about-us/index');
        }
    }, {
        path: '/protocol', // 用户协议
        name: 'protocol',
        component(resolve) {
            require.ensure(['../../views/protocol/index.vue'], () => {
                resolve(require('../../views/protocol/index.vue'));
            }, 'static/views/protocol/index');
        }
    }, {
        path: '/apply-refund/:orderId', // 申请退款
        name: 'apply-refund',
        component(resolve) {
            require.ensure(['../../views/apply-refund/index.vue'], () => {
                resolve(require('../../views/apply-refund/index.vue'));
            }, 'static/views/apply-refund/index');
        }
    }, {
        path: '/fail-reporting', // 故障排查
        name: 'fail-reporting',
        component(resolve) {
            require.ensure(['../../views/fail-reporting/index.vue'], () => {
                resolve(require('../../views/fail-reporting/index.vue'));
            }, 'static/views/fail-reporting/index');
        }
    }, {
        path: '/feedback', // 意见反馈
        name: 'feedback',
        component(resolve) {
            require.ensure(['../../views/feedback/index.vue'], () => {
                resolve(require('../../views/feedback/index.vue'));
            }, 'static/views/feedback/index');
        }
    }, {
        path: '/questionnaire', // 调查问卷 -- 微信暂时没有
        name: 'questionnaire',
        component(resolve) {
            require.ensure(['../../views/questionnaire/index.vue'], () => {
                resolve(require('../../views/questionnaire/index.vue'));
            }, 'static/views/questionnaire/index');
        }
    }, {
        path: '/trouble-shooting', // 故障排查
        name: 'trouble-shooting',
        component(resolve) {
            require.ensure(['../../views/trouble-shooting/index.vue'], () => {
                resolve(require('../../views/trouble-shooting/index.vue'));
            }, 'static/views/trouble-shooting/index');
        }
    }, {
        path: '/redbag',  // 领取红包页面
        name: 'redbag',
        component(resolve) {
            require.ensure(['../../views/redbag/index.vue'], () => {
                resolve(require('../../views/redbag/index.vue'));
            }, 'static/views/redbag/index');
        }
    }]
});

router.beforeEach((to, from, next) => {
    // document.getElementById('cnzz_stat_icon_1274172339').style.display = 'none';

    // 系统初始化逻辑
    next();
});

router.afterEach(() => {
    // 切换页面后将屏幕滚动至顶端
    window.scrollTo(0, 0);
});

export default router;

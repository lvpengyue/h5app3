// https://github.com/vuejs/vuex/issues/451
import 'core-js/fn/promise';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import $group from '@components/utils/$store/modules/$group';
import $apis from '@components/utils/$store/modules/$apis';
import $entities from '@components/utils/$store/modules/$entities';
import $app from './modules/$app';
import mallHome from './modules/mall-home';
import mallMyOrders from './modules/mall-my-orders';
import shopDetail from './modules/shop-detail';
import commentList from './modules/comment-list';
import confirmOrder from './modules/confirm-order';
import orderDetail from './modules/order-detail';
import comment from './modules/comment';



Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    plugins: [
        createPersistedState({
            key: '$group',
            paths: ['$group']
        })
    ],
    modules: {
        $group,
        $apis,
        $entities,
        $app,
        mallHome,
        mallMyOrders,
        shopDetail,
        commentList,
        confirmOrder,
        orderDetail,
        comment
    }
});

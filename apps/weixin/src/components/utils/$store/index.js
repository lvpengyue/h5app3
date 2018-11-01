// https://github.com/vuejs/vuex/issues/451
import 'core-js/fn/promise';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

// import Cookies from 'js-cookie';
import $group from '@components/utils/$store/modules/$group';
import $apis from '@components/utils/$store/modules/$apis';
import $entities from '@components/utils/$store/modules/$entities';
import $app from './modules/$app';
import pintuan from './modules/pin-tuan';
import shopDetail from './modules/shop-detail';
import confirmOrder from './modules/confirm-order';
import pay from './modules/pay';
import home from './modules/home';
import feedback from './modules/feedback';
import questionnaire from './modules/questionnaire';
import failReporting from './modules/fail-reporting';
import applyRefund from './modules/apply-refund';
import orderDetail from './modules/order-detail';
import addressList from './modules/address-list';
import machineList from './modules/machine-list';
import modePay from './modules/mode-pay';
import myCoupons from './modules/my-coupons';
import wash from './modules/wash';
import handInput from './modules/hand-input';
import orderList from './modules/order-list';
import charge from './modules/charge';
import moneyDetail from './modules/money-detail';
import washOrderDetail from './modules/wash-order-detail';
import meal from './modules/meal';
import mealList from './modules/meal-list';
import perfectInformation from './modules/perfect-information';
import login from './modules/login';
import userCenter from './modules/user-center';
import editPhone from './modules/edit-phone';
import redbag from './modules/redbag';



Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    // plugins: [
    //     createPersistedState({
    //         key: '$group',
    //         paths: ['$group']
    //     })
    // ],

    plugins: [
        createPersistedState({
            key: '$group',
            paths: ['$group'],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, {
                    expires: 1
                }),
                removeItem: key => Cookies.remove(key)
            }
        })
    ],
    modules: {
        $group,
        $apis,
        $entities,
        $app,
        pintuan,
        shopDetail,
        confirmOrder,
        pay,
        orderDetail,
        home,
        feedback,
        meal,
        mealList,
        questionnaire,
        failReporting,
        applyRefund,
        addressList,
        machineList,
        modePay,
        myCoupons,
        wash,
        handInput,
        orderList,
        charge,
        moneyDetail,
        washOrderDetail,
        perfectInformation,
        login,
        userCenter,
        editPhone,
        redbag
    }
});

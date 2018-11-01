import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 红包活动
     * @type {Object}
     */
    data: '',

    // 红包领取优惠券信息
    coupon: ''
};

const REDBAG_SET_DATA = 'REDBAG_SET_DATA';
const REDBAG_SET_COUPON = 'REDBAG_SET_COUPON';

const mutations = {

    /**
     * 设置红包活动
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [REDBAG_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置优惠券信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [REDBAG_SET_COUPON](state, mutation) {
        state.coupon = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取红包活动的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async redbagGetData({
        commit,
        dispatch,
        state
    }, params) {
        console.log(params);
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_ACTIVITY_REDPACK_DATA,
                params
            });

            commit({
                type: REDBAG_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取红包活动失败:${error.code}`);
        }
    },

    /**
     * 调用获取优惠券的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async redbagGetCoupon({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_ACTIVITY_REDPACK_GET_COUPON,
                params
            });

            commit({
                type: REDBAG_SET_COUPON,
                payload: response
            });
        } catch (error) {
            console.log(`领取优惠券失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取红包活动
     * @param {Object} state state
     * @return {Object} data 红包活动
     */
    redbagData(state) {
        return state.data;
    },

    /**
     * 获取优惠券活动
     * @param {Object} state state
     * @return {Object} coupon 优惠券
     */
    redbagCoupon(state) {
        return state.coupon;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 支付成功订单信息
     * @type {String}
     */
    detail: ''
};

const ORDER_SET_DETAIL = 'ORDER_SET_DETAIL';

const mutations = {

    /**
     * 支付成功订单信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 支付成功订单信息
     * @param {Object} context context
     * @param {Object} params {orderid, token, userid}
     */
    async orderGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_ORDER_GET_DETAILS,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: ORDER_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            alert('获取订单数据失败');
        }
    }
};

const getters = {

    /**
     * 支付成功订单信息
     * @param {Object} state state
     * @return {String} input 商品详情
     */
    orderDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

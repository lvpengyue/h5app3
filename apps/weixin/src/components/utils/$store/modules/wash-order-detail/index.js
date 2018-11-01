import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 订单详情信息
     * @type {String}
     */
    data: ''

};

const WASH_ORDER_DETAIL_SET_DATA = 'WASH_ORDER_DETAIL_SET_DATA';

const mutations = {

    /**
     * 订单详情信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASH_ORDER_DETAIL_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 订单详情信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async washOrderDetailGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign(
                    {},
                    {
                        uri: '/api/order/details'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: WASH_ORDER_DETAIL_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log('获取订单详情失败');
        }
    }
};

const getters = {

    /**
     * 获取订单详情信息详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    washOrderDetailData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

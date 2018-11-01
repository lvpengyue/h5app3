import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 订单详情
     * @type {Object}
     */
    data: ''
};

const ORDER_DETAIL_SET_DATA = 'ORDER_DETAIL_SET_DATA';

const mutations = {

    /**
     * 设置订单详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_DETAIL_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取订单详情的接口
     * @param {Object} context context
     * @param {Object} params 订单id
     */
    async orderDetailGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_ORDER_DETAILS,
                params: Object.assign(
                    {},
                    this.getters.$groupSourceParams3,
                    {
                        apiTimestamp: +new Date()
                    },
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.info);
            }

            commit({
                type: ORDER_DETAIL_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取订单详情失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取订单详情
     * @param {Object} state state
     * @return {Object} data 订单详情
     */
    orderDetailData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

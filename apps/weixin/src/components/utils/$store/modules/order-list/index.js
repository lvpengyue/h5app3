import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 洗衣订单信息
     * @type {String}
     */
    detail: ''
};

const ORDER_LIST_SET_DETAIL = 'ORDER_LIST_SET_DETAIL';

const mutations = {
    /**
     * 洗衣订单信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_LIST_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 获取微信洗衣订单数据
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async orderListGetDetail({
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
                        uri: '/api/order/list'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: ORDER_LIST_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取洗衣订单数据失败');
        }
    }
};

const getters = {

    /**
     * 获取商品详情
     * @param {Object} state state
     * @return {String} input 商品详情
     */
    orderListDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

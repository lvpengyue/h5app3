import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 确认订单详情
     * @type {String}
     */
    detail: ''
};

const CONFIRM_ORDER_SET_DETAIL = 'CONFIRM_ORDER_SET_DETAIL';


const mutations = {

    /**
     * 商品详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONFIRM_ORDER_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 参加拼团
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async confirmOrderGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_PRODUCT_CONFIRM_PRODUCT,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);

                return;
            }

            commit({
                type: CONFIRM_ORDER_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            alert('获取数据失败');
        }
    }
};

const getters = {

    /**
     * 获取商品详情
     * @param {Object} state state
     * @return {String} input 商品详情
     */
    confirmOrderDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

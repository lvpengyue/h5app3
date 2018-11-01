import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 商品详情
     * @type {String}
     */
    detail: ''
};

const SHOP_SET_DETAIL = 'SHOP_SET_DETAIL';

const mutations = {

    /**
     * 商品详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SHOP_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 调用商品详情接口
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async shopGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_PRODUCT_DETAILS,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: SHOP_SET_DETAIL,
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
    shopDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

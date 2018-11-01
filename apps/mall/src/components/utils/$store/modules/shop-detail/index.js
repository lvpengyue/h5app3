import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 商品详情
     * @type {Object}
     */
    data: ''
};

const SHOP_DETAIL_SET_DATA = 'SHOP_DETAIL_SET_DATA';

const mutations = {

    /**
     * 设置商品详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SHOP_DETAIL_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取商品详情的接口
     * @param {Object} context context
     * @param {Object} params 商品id
     */
    async shopDetailGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_PRODUCT_DETAILS,
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
                type: SHOP_DETAIL_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取商城详情失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取商品详情
     * @param {Object} state state
     * @return {Object} data 商品详情
     */
    shopDetailData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

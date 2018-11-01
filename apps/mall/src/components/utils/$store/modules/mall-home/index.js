import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 商品列表
     * @type {Object}
     */
    data: ''
};

const MALL_HOME_SET_DATA = 'MALL_HOME_SET_DATA';

const mutations = {

    /**
     * 设置商品列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MALL_HOME_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取商品列表的接口
     * @param {Object} context context
     */
    async mallHomeGetData({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_PRODUCT_LIST,
                params: Object.assign(
                    {},
                    this.getters.$groupSourceParams3,
                    {
                        apiTimestamp: +new Date()
                    }
                )
            });

            if (response.code !== 1) {
                alert(response.info);
            }

            commit({
                type: MALL_HOME_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取商城列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取商品列表
     * @param {Object} state state
     * @return {Object} data 商品列表
     */
    mallHomeData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

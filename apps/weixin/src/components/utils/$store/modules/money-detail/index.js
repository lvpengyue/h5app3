import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 收支明细信息
     * @type {String}
     */
    data: ''

};

const MONEY_DETAIL_SET_DATA = 'MONEY_DETAIL_SET_DATA';

const mutations = {

    /**
     * 收支明细信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MONEY_DETAIL_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 收支明细信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async moneyDetailGetData({
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
                        uri: '/api/wallet/list'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MONEY_DETAIL_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log('获取收支明细失败');
        }
    }
};

const getters = {

    /**
     * 获取收支明细信息详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    moneyDetailData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

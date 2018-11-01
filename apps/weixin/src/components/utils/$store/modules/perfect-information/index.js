import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 用户认证信息
     * @type {String}
     */
    detail: ''

};

const PERFECT_INFORMATION_SET_DETAIL = 'PERFECT_INFORMATION_SET_DETAIL';

const mutations = {

    /**
     * 用户认证的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERFECT_INFORMATION_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 用户认证数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async perfectInformationGetDetail({
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
                        uri: '/api/account/new'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.msg);
            }
            commit({
                type: PERFECT_INFORMATION_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('用户认证失败');
        }
    }
};

const getters = {

    /**
     * 获取用户认证详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    perfectInformationDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

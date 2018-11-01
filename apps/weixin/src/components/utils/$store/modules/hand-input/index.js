import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 绑定信息
     * @type {String}
     */
    detail: ''
};

const BIND_SET_DETAIL = 'BIND_SET_DETAIL';

const mutations = {
    /**
     * 绑定信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [BIND_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 获取微信绑定数据
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async bindGetDetail({
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
                        uri: '/api/washer/bind'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: BIND_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取绑定数据失败');
        }
    }
};

const getters = {

    /**
     * 获取商品详情
     * @param {Object} state state
     * @return {String} input 商品详情
     */
    bindDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

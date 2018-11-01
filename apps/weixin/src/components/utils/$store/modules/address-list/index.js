import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 地址信息
     * @type {String}
     */
    detail: ''

};

const ADDRESS_LIST_SET_DETAIL = 'ADDRESS_LIST_SET_DETAIL';

const mutations = {

    /**
     * 地址的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ADDRESS_LIST_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 地址数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async addressListGetDetail({
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
                        uri: '/api/area/list'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.msg);
            }
            commit({
                type: ADDRESS_LIST_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取信息列表失败');
        }
    }
};

const getters = {

    /**
     * 获取地址详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    addressListDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

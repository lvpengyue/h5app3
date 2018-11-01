import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 洗衣机列表信息信息
     * @type {String}
     */
    detail: ''

};

const MACHINE_LIST_SET_DETAIL = 'MACHINE_LIST_SET_DETAIL';

const mutations = {

    /**
     * 洗衣机列表信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_LIST_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 洗衣机列表信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineListGetDetail({
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
                        uri: '/api/washer/list'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.msg);
            }
            commit({
                type: MACHINE_LIST_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取洗衣机列表失败');
        }
    }
};

const getters = {

    /**
     * 获取洗衣机列表信息详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    machineListDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

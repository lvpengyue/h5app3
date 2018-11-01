import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {
    edit: '' // 编辑手机号信息

};

const PHONE_SET_EDIT = 'PHONE_SET_EDIT';

const mutations = {
    /**
     * 手机号修改的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PHONE_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    }
};

const actions = {
    /**
     * 手机号编辑数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async phoneGetEdit({
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
                        uri: '/api/user/change/phone'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: PHONE_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log('修改手机号失败');
        }
    }
};

const getters = {
    /**
     * 获取手机号修改详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    phoneEdit(state) {
        return state.edit;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

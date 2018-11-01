import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 用户信息
     * @type {String}
     */
    detail: '',
    edit: '' // 编辑用户信息

};

const USER_CENTER_SET_DETAIL = 'USER_CENTER_SET_DETAIL';
const USER_CENTER_SET_EDIT = 'USER_CENTER_SET_EDIT';

const mutations = {

    /**
     * 用户的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [USER_CENTER_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 用户修改的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [USER_CENTER_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    }
};

const actions = {
    /**
     * 用户数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async userCenterGetDetail({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign(
                    {},
                    {
                        uri: '/api/user/get/info'
                    },
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: USER_CENTER_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取个人资料失败');
        }
    },

    /**
     * 用户编辑数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async userCenterGetEdit({
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
                        uri: '/api/user/update/info'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: USER_CENTER_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log('编辑个人资料失败');
        }
    }
};

const getters = {

    /**
     * 获取用户详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    userCenterDetail(state) {
        return state.detail;
    },

    /**
     * 获取用户详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    userCenterEdit(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

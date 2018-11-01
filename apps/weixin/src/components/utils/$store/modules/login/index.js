import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {
    codeDetail: '',

    imgValid: '',  // 图片验证码通过结果

    loginValid: '' // 登陆结果
};

const LOGIN_SET_CODE_DETAIL = 'LOGIN_SET_CODE_DETAIL';
const LOGIN_SET_IMG_VALID = 'LOGIN_SET_IMG_VALID';
const LOGIN_SET_LOGIN_VALID = 'LOGIN_SET_LOGIN_VALID';

const mutations = {
    /**
     * 图片验证码详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOGIN_SET_IMG_VALID](state, mutation) {
        state.imgValid = mutation.payload;
    },

    /**
     * 登陆详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOGIN_SET_LOGIN_VALID](state, mutation) {
        state.loginValid = mutation.payload;
    },

    /**
     * 验证码详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOGIN_SET_CODE_DETAIL](state, mutation) {
        state.codeDetail = mutation.payload;
    }
};

const actions = {
    /**
     * 重置订单详情接口
     * @param {Object} context context
     * @param {Object} params rsa
     */
    async loginResetOrderDetail({
        commit,
        state
    }, params) {
        try {
            commit({
                type: LOGIN_SET_DETAIL,
                payload: params
            });
        } catch (error) {
            alert('重置订单详情失败');
        }
    },

    /**
     * 获取验证码详情接口
     * @param {Object} context context
     * @param {Object} params params
     */
    async loginGetCodeDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_CODE_GET_CODE,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            } else {
                alert(response.info);
            }

            commit({
                type: LOGIN_SET_CODE_DETAIL,
                payload: response
            });
        } catch (error) {
            alert('获取验证码失败');
        }
    },

     /**
     * 获取图片验证码详情接口
     * @param {Object} context context
     * @param {Object} params rsa
     */
    async loginGetImageCodeDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_CODE_GET_IMGCODE,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: LOGIN_SET_CODE_DETAIL,
                payload: response
            });
        } catch (error) {
            alert('获取图片验证码失败');
        }
    },

    /**
     * 验证图片验证码详情接口
     * @param {Object} context context
     * @param {Object} params rsa
     */
    async loginValidImageCodeDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_CODE_VALI_IMGCODE,
                params
            });

            alert(response.msg);

            commit({
                type: LOGIN_SET_IMG_VALID,
                payload: response
            });
        } catch (error) {
            alert('请输入验证码');
        }
    },

    /**
     * 登陆
     * @param {Object} context context
     * @param {Object} params rsa
     */
    async loginUserLogin({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_USER_LOGIN,
                params
            });

            alert(response.msg);

            commit({
                type: LOGIN_SET_LOGIN_VALID,
                payload: response
            });
        } catch (error) {
            alert('登陆失败');
        }
    }
};

const getters = {
    /**
     * 验证码详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    loginCodeDetail(state) {
        return state.codeDetail;
    },

    /**
     * 图片验证码详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    loginImgValid(state) {
        return state.imgValid;
    },

    /**
     * 登陆详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    loginLoginValid(state) {
        return state.loginValid;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 订单详情
     * @type {String}
     */
    detail: '',

    codeDetail: '',

    imgValid: '',  // 图片验证码通过结果

    loginValid: '' // 登陆结果
};

const PIN_SET_DETAIL = 'PIN_SET_DETAIL';
const PIN_SET_CODE_DETAIL = 'PIN_SET_CODE_DETAIL';
const PIN_SET_IMG_VALID = 'PIN_SET_IMG_VALID';
const PIN_SET_LOGIN_VALID = 'PIN_SET_LOGIN_VALID';

const mutations = {

    /**
     * 订单详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PIN_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 图片验证码详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PIN_SET_IMG_VALID](state, mutation) {
        state.imgValid = mutation.payload;
    },

    /**
     * 登陆详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PIN_SET_LOGIN_VALID](state, mutation) {
        state.loginValid = mutation.payload;
    },

    /**
     * 验证码详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PIN_SET_CODE_DETAIL](state, mutation) {
        state.codeDetail = mutation.payload;
    }
};

const actions = {
    /**
     * 调用订单详情接口
     * @param {Object} context context
     * @param {Object} params rsa
     */
    async pinGetOrderDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_ORDER_DETAILS,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);

                return;
            }

            commit({
                type: PIN_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            alert('获取数据失败');
        }
    },

    /**
     * 重置订单详情接口
     * @param {Object} context context
     * @param {Object} params rsa
     */
    async pinResetOrderDetail({
        commit,
        state
    }, params) {
        try {
            commit({
                type: PIN_SET_DETAIL,
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
    async pinGetCodeDetail({
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
                type: PIN_SET_CODE_DETAIL,
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
    async pinGetImageCodeDetail({
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
                type: PIN_SET_CODE_DETAIL,
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
    async pinValidImageCodeDetail({
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
                type: PIN_SET_IMG_VALID,
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
    async pinUserLogin({
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
                type: PIN_SET_LOGIN_VALID,
                payload: response
            });
        } catch (error) {
            alert('登陆失败');
        }
    }
};

const getters = {

    /**
     * 获取订单详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    pinDetail(state) {
        return state.detail;
    },

    /**
     * 验证码详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    pinCodeDetail(state) {
        return state.codeDetail;
    },

    /**
     * 图片验证码详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    pinImgValid(state) {
        return state.imgValid;
    },

    /**
     * 登陆详情
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    pinLoginValid(state) {
        return state.loginValid;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
